using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DonationManagementAPI.Data;
using DonationManagementAPI.DTOs;
using DonationManagementAPI.Models;
using DonationManagementAPI.Services;

namespace DonationManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(AppDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserResponseDto>> Register(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower()))
            {
                return BadRequest(new { message = "Email already in use." });
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email.ToLower(),
                PasswordHash = PasswordHasher.Hash(dto.Password),
                Role = "Donor",
                Avatar = $"https://api.dicebear.com/7.x/avataaars/svg?seed={Uri.EscapeDataString(dto.Name)}",
                Status = "active",
                JoinedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateToken(user);

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Avatar = user.Avatar,
                Status = user.Status,
                JoinedAt = user.JoinedAt,
                Token = token
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserResponseDto>> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());
            if (user == null || !PasswordHasher.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            if (user.Status == "blocked")
            {
                return StatusCode(403, new { message = "Your account has been blocked by an administrator." });
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Avatar = user.Avatar,
                Status = user.Status,
                JoinedAt = user.JoinedAt,
                Token = token
            });
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<UserResponseDto>> GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "User not found." });

            if (user.Status == "blocked")
            {
                return StatusCode(403, new { message = "Your account is blocked." });
            }

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Avatar = user.Avatar,
                Status = user.Status,
                JoinedAt = user.JoinedAt
            });
        }

        [Authorize]
        [HttpPut("profile")]
        public async Task<ActionResult<UserResponseDto>> UpdateProfile(UpdateProfileDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "User not found." });

            if (user.Email.ToLower() != dto.Email.ToLower() &&
                await _context.Users.AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower()))
            {
                return BadRequest(new { message = "Email already in use." });
            }

            user.Name = dto.Name;
            user.Email = dto.Email.ToLower();
            if (!string.IsNullOrEmpty(dto.Password))
            {
                user.PasswordHash = PasswordHasher.Hash(dto.Password);
            }

            await _context.SaveChangesAsync();

            return Ok(new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Avatar = user.Avatar,
                Status = user.Status,
                JoinedAt = user.JoinedAt
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    id = u.Id,
                    name = u.Name,
                    email = u.Email,
                    status = u.Status,
                    joined = u.JoinedAt.ToString("yyyy-MM-dd"),
                    donationsCount = _context.Donations.Count(d => d.UserId == u.Id)
                })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("users/{id}/status")]
        public async Task<ActionResult> ToggleUserStatus(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "User not found." });

            if (user.Role == "Admin")
            {
                return BadRequest(new { message = "Cannot block an administrator." });
            }

            user.Status = user.Status == "active" ? "blocked" : "active";
            await _context.SaveChangesAsync();

            return Ok(new { id = user.Id, status = user.Status });
        }

        [Authorize]
        [HttpGet("saved-campaigns")]
        public async Task<ActionResult> GetSavedCampaigns()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _context.Users
                .Include(u => u.SavedCampaigns)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound();

            return Ok(user.SavedCampaigns.Select(c => c.Id).ToList());
        }

        [Authorize]
        [HttpPost("saved-campaigns/{id}")]
        public async Task<ActionResult> ToggleSaveCampaign(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _context.Users
                .Include(u => u.SavedCampaigns)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound();

            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null) return NotFound(new { message = "Campaign not found." });

            var saved = user.SavedCampaigns.FirstOrDefault(c => c.Id == id);
            if (saved != null)
            {
                user.SavedCampaigns.Remove(saved);
            }
            else
            {
                user.SavedCampaigns.Add(campaign);
            }

            await _context.SaveChangesAsync();

            return Ok(user.SavedCampaigns.Select(c => c.Id).ToList());
        }
    }
}
