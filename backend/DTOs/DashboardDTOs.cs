using System.Collections.Generic;

namespace DonationManagementAPI.DTOs
{
    public class MonthlyStatDto
    {
        public string Month { get; set; } = string.Empty;
        public decimal Donations { get; set; }
        public int Campaigns { get; set; }
    }

    public class DashboardStatsDto
    {
        public decimal TotalDonationsVolume { get; set; }
        public int ActiveCampaignsCount { get; set; }
        public int TotalUsersCount { get; set; }
        public decimal TotalRaisedCatalog { get; set; }
        public List<MonthlyStatDto> MonthlyStats { get; set; } = new();
    }
}
