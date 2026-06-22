using System;
using System.Collections.Generic;
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
    public class DonationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPaymentService _paymentService;

        public DonationsController(AppDbContext context, IPaymentService paymentService)
        {
            _context = context;
            _paymentService = paymentService;
        }

        [HttpPost]
        public async Task<ActionResult<DonationDto>> CreateDonation(DonationCreateDto dto)
        {
            var campaign = await _context.Campaigns.FindAsync(dto.CampaignId);
            if (campaign == null) return NotFound(new { message = "Campaign not found." });

            if (campaign.Status != "active")
            {
                return BadRequest(new { message = "Campaign is not accepting donations at this time." });
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            User? user = null;
            if (!string.IsNullOrEmpty(userId))
            {
                user = await _context.Users.FindAsync(userId);
            }

            var isPaymentSuccessful = await _paymentService.ProcessPaymentAsync(dto.Amount, dto.Method);
            var status = isPaymentSuccessful ? "completed" : "failed";

            var donation = new Donation
            {
                Amount = dto.Amount,
                Method = dto.Method,
                Anonymous = dto.Anonymous,
                At = DateTime.UtcNow,
                Status = status,
                CampaignId = campaign.Id,
                UserId = user?.Id,
                DonorName = dto.Anonymous ? "Anonymous" : (user?.Name ?? dto.DonorName ?? "Anonymous")
            };

            _context.Donations.Add(donation);

            if (isPaymentSuccessful)
            {
                // Update campaign stats
                campaign.Raised += dto.Amount;
                campaign.Donors += 1;

                // Add success notification
                var notification = new Notification
                {
                    Title = "Donation successful",
                    Body = $"Thank you! Your gift of ${dto.Amount} to {campaign.Title} is confirmed.",
                    Type = "success",
                    CreatedAt = DateTime.UtcNow,
                    UserId = user?.Id
                };
                _context.Notifications.Add(notification);
            }

            await _context.SaveChangesAsync();

            return Ok(new DonationDto
            {
                Id = donation.Id,
                CampaignId = donation.CampaignId,
                CampaignTitle = campaign.Title,
                Amount = donation.Amount,
                Method = donation.Method,
                Anonymous = donation.Anonymous,
                At = donation.At,
                Status = donation.Status,
                Donor = donation.DonorName
            });
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<DonationDto>>> GetMyDonations()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var donations = await _context.Donations
                .Include(d => d.Campaign)
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.At)
                .ToListAsync();

            return Ok(donations.Select(d => new DonationDto
            {
                Id = d.Id,
                CampaignId = d.CampaignId,
                CampaignTitle = d.Campaign.Title,
                Amount = d.Amount,
                Method = d.Method,
                Anonymous = d.Anonymous,
                At = d.At,
                Status = d.Status,
                Donor = d.DonorName
            }));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<DonationDto>>> GetAllDonations()
        {
            var donations = await _context.Donations
                .Include(d => d.Campaign)
                .OrderByDescending(d => d.At)
                .ToListAsync();

            return Ok(donations.Select(d => new DonationDto
            {
                Id = d.Id,
                CampaignId = d.CampaignId,
                CampaignTitle = d.Campaign.Title,
                Amount = d.Amount,
                Method = d.Method,
                Anonymous = d.Anonymous,
                At = d.At,
                Status = d.Status,
                Donor = d.DonorName
            }));
        }
    }
}
