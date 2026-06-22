using System;

namespace DonationManagementAPI.Models
{
    public class Notification
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public string Type { get; set; } = "update"; // success, update, reminder
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // User link (optional, null means broadcast to all users)
        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}
