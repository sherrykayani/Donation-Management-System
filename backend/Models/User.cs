using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DonationManagementAPI.Models
{
    public class User
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Donor"; // "Admin" or "Donor"
        public string Avatar { get; set; } = string.Empty;
        public string Status { get; set; } = "active"; // "active" or "blocked"
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;

        // Relationships
        [JsonIgnore]
        public List<Donation> Donations { get; set; } = new();

        [JsonIgnore]
        public List<Campaign> SavedCampaigns { get; set; } = new();
    }
}
