using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace DonationManagementAPI.Models
{
    public class Volunteer
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Why { get; set; } = string.Empty;

        // Skills stored as JSON string in database
        public string SkillsJson { get; set; } = "[]";

        [NotMapped]
        public List<string> Skills
        {
            get
            {
                try
                {
                    return JsonSerializer.Deserialize<List<string>>(SkillsJson ?? "[]") ?? new List<string>();
                }
                catch
                {
                    return new List<string>();
                }
            }
            set
            {
                SkillsJson = JsonSerializer.Serialize(value ?? new List<string>());
            }
        }

        public string Status { get; set; } = "pending"; // pending, approved, rejected
        public string Task { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
