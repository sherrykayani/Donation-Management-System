using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using DonationManagementAPI.Models;
using DonationManagementAPI.Services;

namespace DonationManagementAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // Create database if not exists (runs migrations or creates schema)
            context.Database.EnsureCreated();

            // Seed Users
            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User
                    {
                        Id = "au1",
                        Name = "Sam Rivera",
                        Email = "sam@hopefund.org",
                        PasswordHash = PasswordHasher.Hash("admin123"),
                        Role = "Admin",
                        Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
                        Status = "active",
                        JoinedAt = DateTime.Parse("2023-01-12")
                    },
                    new User
                    {
                        Id = "au2",
                        Name = "Taylor Brooks",
                        Email = "taylor@email.com",
                        PasswordHash = PasswordHasher.Hash("password123"),
                        Role = "Donor",
                        Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
                        Status = "blocked",
                        JoinedAt = DateTime.Parse("2024-06-02")
                    },
                    new User
                    {
                        Id = "au3",
                        Name = "Morgan Lee",
                        Email = "morgan@email.com",
                        PasswordHash = PasswordHasher.Hash("password123"),
                        Role = "Donor",
                        Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
                        Status = "active",
                        JoinedAt = DateTime.Parse("2022-11-20")
                    },
                    new User
                    {
                        Id = "u1",
                        Name = "Alex Morgan",
                        Email = "alex@example.com",
                        PasswordHash = PasswordHasher.Hash("password123"),
                        Role = "Donor",
                        Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                        Status = "active",
                        JoinedAt = DateTime.UtcNow.AddDays(-30)
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }

            // Seed Campaigns
            if (!context.Campaigns.Any())
            {
                var campaigns = new List<Campaign>
                {
                    new Campaign
                    {
                        Id = "c1",
                        Title = "Clean Water for Rural Schools",
                        Category = "health",
                        Short = "Install filtration systems and boreholes for 12 partner schools.",
                        Description = "Millions of children miss class due to waterborne illness. This campaign funds sustainable filtration, hygiene training, and maintenance kits for a full academic year. Every dollar is matched by our corporate partners up to $50,000.",
                        Goal = 120000,
                        Raised = 78240,
                        Donors = 1842,
                        Urgent = true,
                        Trending = true,
                        Image = "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=1200&q=80",
                        GalleryJson = JsonSerializer.Serialize(new List<string> {
                            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
                            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773f?w=800&q=80",
                            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                        }),
                        Organizer = "HopeFund Field Ops",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow.AddDays(-60)
                    },
                    new Campaign
                    {
                        Id = "c2",
                        Title = "Scholarships for STEM Girls",
                        Category = "education",
                        Short = "Full-year scholarships, laptops, and mentorship for 200 students.",
                        Description = "We partner with regional universities to provide tuition, devices, and weekly mentorship circles led by women in tech. Outcomes are tracked with anonymized dashboards shared with donors each quarter.",
                        Goal = 250000,
                        Raised = 198400,
                        Donors = 3201,
                        Urgent = false,
                        Trending = true,
                        Image = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
                        GalleryJson = JsonSerializer.Serialize(new List<string> {
                            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
                            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
                        }),
                        Organizer = "HopeFund Education",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow.AddDays(-45)
                    },
                    new Campaign
                    {
                        Id = "c3",
                        Title = "Reforest the Highlands",
                        Category = "environment",
                        Short = "Native saplings, community nurseries, and fire-break maintenance.",
                        Description = "Climate-resilient reforestation with local cooperatives. Includes GPS-tagged planting reports and seasonal photo updates from the field team.",
                        Goal = 90000,
                        Raised = 41200,
                        Donors = 956,
                        Urgent = false,
                        Trending = false,
                        Image = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
                        GalleryJson = JsonSerializer.Serialize(new List<string> {
                            "https://images.unsplash.com/photo-1473448912262-161d3a987e84?w=800&q=80",
                            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
                        }),
                        Organizer = "GreenReach Alliance",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow.AddDays(-30)
                    },
                    new Campaign
                    {
                        Id = "c4",
                        Title = "Emergency Shelter Kits",
                        Category = "disaster",
                        Short = "Insulated tents, solar lights, and hygiene packs for families.",
                        Description = "Rapid-deployment kits staged in three regional hubs. Activated within 24 hours of verified alerts with partner NGOs handling last-mile distribution.",
                        Goal = 60000,
                        Raised = 58900,
                        Donors = 4102,
                        Urgent = true,
                        Trending = true,
                        Image = "https://images.unsplash.com/photo-1593113598338-c288d82433f7?w=1200&q=80",
                        GalleryJson = JsonSerializer.Serialize(new List<string> {
                            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
                        }),
                        Organizer = "RapidAid Coalition",
                        Status = "active",
                        CreatedAt = DateTime.UtcNow.AddDays(-15)
                    },
                    new Campaign
                    {
                        Id = "c5",
                        Title = "Community Kitchen & Meals",
                        Category = "community",
                        Short = "Hot meals, nutritionists on site, and job training for volunteers.",
                        Description = "Serving 1,200 meals weekly across two neighborhoods with a focus on seniors and families experiencing housing instability.",
                        Goal = 45000,
                        Raised = 22100,
                        Donors = 612,
                        Urgent = false,
                        Trending = false,
                        Image = "https://images.unsplash.com/photo-1593113646773-028c64a10320?w=1200&q=80",
                        GalleryJson = JsonSerializer.Serialize(new List<string> {
                            "https://images.unsplash.com/photo-1544027993-37f079a9e9c7?w=800&q=80"
                        }),
                        Organizer = "Neighbors Table",
                        Status = "paused",
                        CreatedAt = DateTime.UtcNow.AddDays(-10)
                    }
                };

                context.Campaigns.AddRange(campaigns);
                context.SaveChanges();
            }

            // Seed Donations
            if (!context.Donations.Any())
            {
                var donations = new List<Donation>
                {
                    new Donation
                    {
                        Id = "d1",
                        Amount = 120,
                        Method = "Card",
                        Anonymous = false,
                        At = DateTime.Parse("2026-05-10"),
                        Status = "completed",
                        CampaignId = "c1",
                        UserId = "au1",
                        DonorName = "Sam Rivera"
                    },
                    new Donation
                    {
                        Id = "d2",
                        Amount = 500,
                        Method = "ACH",
                        Anonymous = true,
                        At = DateTime.Parse("2026-05-11"),
                        Status = "pending",
                        CampaignId = "c4",
                        DonorName = "Anonymous"
                    },
                    new Donation
                    {
                        Id = "d3",
                        Amount = 75,
                        Method = "Card",
                        Anonymous = false,
                        At = DateTime.Parse("2026-05-12"),
                        Status = "completed",
                        CampaignId = "c2",
                        UserId = "au3",
                        DonorName = "Morgan Lee"
                    },
                    new Donation
                    {
                        Id = "d4",
                        Amount = 40,
                        Method = "Wallet",
                        Anonymous = false,
                        At = DateTime.Parse("2026-05-08"),
                        Status = "failed",
                        CampaignId = "c3",
                        DonorName = "Jordan L."
                    }
                };

                context.Donations.AddRange(donations);
                context.SaveChanges();
            }

            // Seed Volunteers
            if (!context.Volunteers.Any())
            {
                var volunteers = new List<Volunteer>
                {
                    new Volunteer
                    {
                        Id = "v1",
                        Name = "Casey Kim",
                        Email = "casey@email.com",
                        Phone = "555-0199",
                        Why = "I would love to help organize events and manage distribution logs.",
                        SkillsJson = JsonSerializer.Serialize(new List<string> { "Logistics", "Events" }),
                        Status = "pending",
                        Task = "Warehouse sort — May 18",
                        CreatedAt = DateTime.UtcNow.AddDays(-12)
                    },
                    new Volunteer
                    {
                        Id = "v2",
                        Name = "Riley Chen",
                        Email = "riley@email.com",
                        Phone = "555-0244",
                        Why = "I am a graphic designer hoping to help create campaign brochures and visual designs.",
                        SkillsJson = JsonSerializer.Serialize(new List<string> { "Design", "Social" }),
                        Status = "approved",
                        Task = "Campaign assets review",
                        CreatedAt = DateTime.UtcNow.AddDays(-20)
                    }
                };

                context.Volunteers.AddRange(volunteers);
                context.SaveChanges();
            }

            // Seed Notifications
            if (!context.Notifications.Any())
            {
                var notifications = new List<Notification>
                {
                    new Notification
                    {
                        Id = "n1",
                        Title = "Donation successful",
                        Body = "Thank you! Your gift to Clean Water for Rural Schools is confirmed.",
                        Type = "success",
                        CreatedAt = DateTime.UtcNow.AddHours(-2)
                    },
                    new Notification
                    {
                        Id = "n2",
                        Title = "Campaign update",
                        Body = "Emergency Shelter Kits reached 98% of goal — final stretch!",
                        Type = "update",
                        CreatedAt = DateTime.UtcNow.AddDays(-1)
                    },
                    new Notification
                    {
                        Id = "n3",
                        Title = "Reminder",
                        Body = "Your monthly pledge renews in 3 days.",
                        Type = "reminder",
                        CreatedAt = DateTime.UtcNow.AddDays(-2)
                    }
                };

                context.Notifications.AddRange(notifications);
                context.SaveChanges();
            }
        }
    }
}
