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
    public class CampaignsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CampaignsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampaignDto>>> GetActiveCampaigns()
        {
            var campaigns = await _context.Campaigns
                .Where(c => c.Status != "archived")
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return Ok(campaigns.Select(MapToDto));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<CampaignDto>>> GetAllCampaigns()
        {
            var campaigns = await _context.Campaigns
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return Ok(campaigns.Select(MapToDto));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CampaignDto>> GetCampaign(string id)
        {
            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null) return NotFound(new { message = "Campaign not found." });

            return Ok(MapToDto(campaign));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<CampaignDto>> CreateCampaign(CampaignCreateDto dto)
        {
            var campaign = new Campaign
            {
                Title = dto.Title,
                Category = dto.Category,
                Short = dto.Short,
                Description = dto.Description,
                Goal = dto.Goal,
                Raised = dto.Raised,
                Donors = dto.Donors,
                Urgent = dto.Urgent,
                Trending = dto.Trending,
                Image = dto.Image,
                Gallery = dto.Gallery ?? new List<string> { dto.Image },
                Organizer = dto.Organizer,
                Status = dto.Status,
                CreatedAt = DateTime.UtcNow
            };

            _context.Campaigns.Add(campaign);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCampaign), new { id = campaign.Id }, MapToDto(campaign));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<CampaignDto>> UpdateCampaign(string id, CampaignCreateDto dto)
        {
            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null) return NotFound(new { message = "Campaign not found." });

            campaign.Title = dto.Title;
            campaign.Category = dto.Category;
            campaign.Short = dto.Short;
            campaign.Description = dto.Description;
            campaign.Goal = dto.Goal;
            campaign.Raised = dto.Raised;
            campaign.Donors = dto.Donors;
            campaign.Urgent = dto.Urgent;
            campaign.Trending = dto.Trending;
            if (!string.IsNullOrEmpty(dto.Image))
            {
                campaign.Image = dto.Image;
            }
            if (dto.Gallery != null && dto.Gallery.Count > 0)
            {
                campaign.Gallery = dto.Gallery;
            }
            campaign.Organizer = dto.Organizer;
            campaign.Status = dto.Status;

            await _context.SaveChangesAsync();

            return Ok(MapToDto(campaign));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCampaign(string id)
        {
            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null) return NotFound(new { message = "Campaign not found." });

            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static CampaignDto MapToDto(Campaign c) => new()
        {
            Id = c.Id,
            Title = c.Title,
            Category = c.Category,
            Short = c.Short,
            Description = c.Description,
            Goal = c.Goal,
            Raised = c.Raised,
            Donors = c.Donors,
            Urgent = c.Urgent,
            Trending = c.Trending,
            Image = c.Image,
            Gallery = c.Gallery,
            Organizer = c.Organizer,
            Status = c.Status,
            CreatedAt = c.CreatedAt
        };
    }
}
