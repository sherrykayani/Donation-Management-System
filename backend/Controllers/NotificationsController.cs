using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DonationManagementAPI.Data;
using DonationManagementAPI.Models;

namespace DonationManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetNotifications()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Fetch notifications that are either broadcast (UserId is null) OR targeted to the logged-in user
            var query = _context.Notifications.AsQueryable();

            if (string.IsNullOrEmpty(userId))
            {
                query = query.Where(n => n.UserId == null);
            }
            else
            {
                query = query.Where(n => n.UserId == null || n.UserId == userId);
            }

            var list = await query
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            // Project to match frontend expected fields
            var response = list.Select(n => new
            {
                id = n.Id,
                title = n.Title,
                body = n.Body,
                type = n.Type,
                time = GetTimeAgo(n.CreatedAt)
            });

            return Ok(response);
        }

        private static string GetTimeAgo(System.DateTime dateTime)
        {
            var span = System.DateTime.UtcNow - dateTime;
            if (span.TotalMinutes < 60)
            {
                return $"{(int)span.TotalMinutes}m ago";
            }
            if (span.TotalHours < 24)
            {
                return $"{(int)span.TotalHours}h ago";
            }
            return $"{(int)span.TotalDays}d ago";
        }
    }
}
