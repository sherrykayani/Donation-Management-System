using System;
using System.Collections.Generic;

namespace DonationManagementAPI.DTOs
{
    public class CampaignDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Short { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Goal { get; set; }
        public decimal Raised { get; set; }
        public int Donors { get; set; }
        public bool Urgent { get; set; }
        public bool Trending { get; set; }
        public string Image { get; set; } = string.Empty;
        public List<string> Gallery { get; set; } = new();
        public string Organizer { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class CampaignCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Short { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Goal { get; set; }
        public decimal Raised { get; set; }
        public int Donors { get; set; }
        public bool Urgent { get; set; }
        public bool Trending { get; set; }
        public string Image { get; set; } = string.Empty;
        public List<string>? Gallery { get; set; }
        public string Organizer { get; set; } = "HopeFund";
        public string Status { get; set; } = "active";
    }
}
