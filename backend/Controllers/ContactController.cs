using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DonationManagementAPI.Data;
using DonationManagementAPI.DTOs;
using DonationManagementAPI.Models;

namespace DonationManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> SendMessage(ContactMessageDto dto)
        {
            var message = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };

            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Your support message has been sent successfully." });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactMessageResponseDto>>> GetMessages()
        {
            var messages = await _context.ContactMessages
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return Ok(messages.Select(m => new ContactMessageResponseDto
            {
                Id = m.Id,
                Name = m.Name,
                Email = m.Email,
                Message = m.Message,
                CreatedAt = m.CreatedAt
            }));
        }
    }
}
