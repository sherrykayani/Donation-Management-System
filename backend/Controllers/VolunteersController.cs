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
    public class VolunteersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VolunteersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<VolunteerDto>> Apply(VolunteerCreateDto dto)
        {
            var volunteer = new Volunteer
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Why = dto.Why,
                Skills = dto.Skills,
                Status = "pending",
                Task = string.Empty,
                CreatedAt = DateTime.UtcNow
            };

            _context.Volunteers.Add(volunteer);
            await _context.SaveChangesAsync();

            return Ok(MapToDto(volunteer));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VolunteerDto>>> GetVolunteers()
        {
            var volunteers = await _context.Volunteers
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();

            return Ok(volunteers.Select(MapToDto));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/status")]
        public async Task<ActionResult<VolunteerDto>> UpdateVolunteerTask(string id, VolunteerTaskDto dto)
        {
            var volunteer = await _context.Volunteers.FindAsync(id);
            if (volunteer == null) return NotFound(new { message = "Volunteer not found." });

            if (!string.IsNullOrEmpty(dto.Status))
            {
                volunteer.Status = dto.Status;
            }
            if (!string.IsNullOrEmpty(dto.Task))
            {
                volunteer.Task = dto.Task;
                // If a task is assigned, let's auto approve
                volunteer.Status = "approved";
            }

            await _context.SaveChangesAsync();

            return Ok(MapToDto(volunteer));
        }

        private static VolunteerDto MapToDto(Volunteer v) => new()
        {
            Id = v.Id,
            Name = v.Name,
            Email = v.Email,
            Phone = v.Phone,
            Why = v.Why,
            Skills = v.Skills,
            Status = v.Status,
            Task = v.Task,
            CreatedAt = v.CreatedAt
        };
    }
}
