using System;

namespace DonationManagementAPI.DTOs
{
    public class DonationCreateDto
    {
        public string CampaignId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Method { get; set; } = "card"; // card, ach, wallet
        public bool Anonymous { get; set; }
        public string? DonorName { get; set; }
    }

    public class DonationDto
    {
        public string Id { get; set; } = string.Empty;
        public string CampaignId { get; set; } = string.Empty;
        public string CampaignTitle { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Method { get; set; } = string.Empty;
        public bool Anonymous { get; set; }
        public DateTime At { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Donor { get; set; } = string.Empty;
    }
}
