using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DonationManagementAPI.Data;
using DonationManagementAPI.DTOs;

namespace DonationManagementAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<DashboardStatsDto>> GetStats()
        {
            var totalDonationsVolume = await _context.Donations
                .Where(d => d.Status == "completed")
                .SumAsync(d => d.Amount);

            var activeCampaignsCount = await _context.Campaigns
                .CountAsync(c => c.Status == "active");

            var totalUsersCount = await _context.Users
                .CountAsync();

            var totalRaisedCatalog = await _context.Campaigns
                .SumAsync(c => c.Raised);

            // Seeded baseline monthly statistics (matching mockData.js)
            var baselineStats = new List<MonthlyStatDto>
            {
                new() { Month = "Jan", Donations = 12000, Campaigns = 4 },
                new() { Month = "Feb", Donations = 18500, Campaigns = 5 },
                new() { Month = "Mar", Donations = 14200, Campaigns = 5 },
                new() { Month = "Apr", Donations = 22100, Campaigns = 6 },
                new() { Month = "May", Donations = 19800, Campaigns = 6 },
            };

            // Aggregate current SQLite donation receipts to update chart dynamically
            var dbDonations = await _context.Donations
                .Where(d => d.Status == "completed")
                .ToListAsync();

            // Group by abbreviated month name (e.g., "Jun", "May")
            var grouped = dbDonations
                .GroupBy(d => d.At.ToString("MMM"))
                .ToDictionary(g => g.Key, g => g.Sum(d => d.Amount));

            // Merge SQLite actual records into the chart metrics
            foreach (var stat in baselineStats)
            {
                if (grouped.TryGetValue(stat.Month, out var dbSum))
                {
                    stat.Donations += dbSum;
                }
            }

            // Append any months not present in the initial baseline
            var existingMonths = baselineStats.Select(s => s.Month).ToHashSet();
            foreach (var group in grouped)
            {
                if (!existingMonths.Contains(group.Key))
                {
                    baselineStats.Add(new MonthlyStatDto
                    {
                        Month = group.Key,
                        Donations = group.Value,
                        Campaigns = activeCampaignsCount
                    });
                }
            }

            return Ok(new DashboardStatsDto
            {
                TotalDonationsVolume = totalDonationsVolume,
                ActiveCampaignsCount = activeCampaignsCount,
                TotalUsersCount = totalUsersCount,
                TotalRaisedCatalog = totalRaisedCatalog,
                MonthlyStats = baselineStats
            });
        }
    }
}
