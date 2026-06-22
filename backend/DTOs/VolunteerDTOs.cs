using System;
using System.Collections.Generic;

namespace DonationManagementAPI.DTOs
{
    public class VolunteerCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Why { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new();
    }

    public class VolunteerDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Why { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new();
        public string Status { get; set; } = string.Empty;
        public string Task { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class VolunteerTaskDto
    {
        public string Task { get; set; } = string.Empty;
        public string? Status { get; set; }
    }
}
