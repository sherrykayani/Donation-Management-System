using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DonationManagementAPI.Models
{
    public class Campaign
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // health, education, environment, disaster, community
        public string Short { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Goal { get; set; }
        public decimal Raised { get; set; }
        public int Donors { get; set; }
        public bool Urgent { get; set; }
        public bool Trending { get; set; }
        public string Image { get; set; } = string.Empty;

        // Image gallery storage as JSON string in SQLite
        public string GalleryJson { get; set; } = "[]";

        [NotMapped]
        public List<string> Gallery
        {
            get
            {
                try
                {
                    return JsonSerializer.Deserialize<List<string>>(GalleryJson ?? "[]") ?? new List<string>();
                }
                catch
                {
                    return new List<string>();
                }
            }
            set
            {
                GalleryJson = JsonSerializer.Serialize(value ?? new List<string>());
            }
        }

        public string Organizer { get; set; } = "HopeFund";
        public string Status { get; set; } = "active"; // active, paused, archived
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relationships
        [JsonIgnore]
        public List<Donation> Donations { get; set; } = new();

        [JsonIgnore]
        public List<User> SavedByUsers { get; set; } = new();
    }
}
