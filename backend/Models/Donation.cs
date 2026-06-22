using System;

namespace DonationManagementAPI.Models
{
    public class Donation
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public decimal Amount { get; set; }
        public string Method { get; set; } = "card"; // card, ach, wallet
        public bool Anonymous { get; set; }
        public DateTime At { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "completed"; // completed, pending, failed

        // Campaign link
        public string CampaignId { get; set; } = string.Empty;
        public Campaign Campaign { get; set; } = null!;

        // User link (optional, for guest donations)
        public string? UserId { get; set; }
        public User? User { get; set; }

        // Donor's display name if not logged in or guest
        public string DonorName { get; set; } = "Anonymous";
    }
}
