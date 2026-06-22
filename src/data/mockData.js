export const categories = [
  { id: "all", label: "All" },
  { id: "health", label: "Health" },
  { id: "education", label: "Education" },
  { id: "environment", label: "Environment" },
  { id: "disaster", label: "Disaster Relief" },
  { id: "community", label: "Community" },
];

export const campaigns = [
  {
    id: "c1",
    title: "Clean Water for Rural Schools",
    category: "health",
    short: "Install filtration systems and boreholes for 12 partner schools.",
    description:
      "Millions of children miss class due to waterborne illness. This campaign funds sustainable filtration, hygiene training, and maintenance kits for a full academic year. Every dollar is matched by our corporate partners up to $50,000.",
    goal: 120000,
    raised: 78240,
    donors: 1842,
    urgent: true,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773f?w=800&q=80",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    ],
    organizer: "HopeFund Field Ops",
    status: "active",
  },
  {
    id: "c2",
    title: "Scholarships for STEM Girls",
    category: "education",
    short: "Full-year scholarships, laptops, and mentorship for 200 students.",
    description:
      "We partner with regional universities to provide tuition, devices, and weekly mentorship circles led by women in tech. Outcomes are tracked with anonymized dashboards shared with donors each quarter.",
    goal: 250000,
    raised: 198400,
    donors: 3201,
    urgent: false,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    ],
    organizer: "HopeFund Education",
    status: "active",
  },
  {
    id: "c3",
    title: "Reforest the Highlands",
    category: "environment",
    short: "Native saplings, community nurseries, and fire-break maintenance.",
    description:
      "Climate-resilient reforestation with local cooperatives. Includes GPS-tagged planting reports and seasonal photo updates from the field team.",
    goal: 90000,
    raised: 41200,
    donors: 956,
    urgent: false,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1473448912262-161d3a987e84?w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    ],
    organizer: "GreenReach Alliance",
    status: "active",
  },
  {
    id: "c4",
    title: "Emergency Shelter Kits",
    category: "disaster",
    short: "Insulated tents, solar lights, and hygiene packs for families.",
    description:
      "Rapid-deployment kits staged in three regional hubs. Activated within 24 hours of verified alerts with partner NGOs handling last-mile distribution.",
    goal: 60000,
    raised: 58900,
    donors: 4102,
    urgent: true,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1593113598338-c288d82433f7?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    ],
    organizer: "RapidAid Coalition",
    status: "active",
  },
  {
    id: "c5",
    title: "Community Kitchen & Meals",
    category: "community",
    short: "Hot meals, nutritionists on site, and job training for volunteers.",
    description:
      "Serving 1,200 meals weekly across two neighborhoods with a focus on seniors and families experiencing housing instability.",
    goal: 45000,
    raised: 22100,
    donors: 612,
    urgent: false,
    trending: false,
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a10320?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544027993-37f079a9e9c7?w=800&q=80",
    ],
    organizer: "Neighbors Table",
    status: "paused",
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "Transparent reporting and thoughtful design. I finally feel confident recurring monthly.",
    name: "Priya N.",
    role: "Monthly donor since 2022",
  },
  {
    id: "t2",
    quote:
      "Campaign pages are gorgeous on mobile. Sharing with friends took two taps.",
    name: "Jordan L.",
    role: "Fundraiser volunteer",
  },
  {
    id: "t3",
    quote:
      "As a nonprofit partner, the admin dashboard saves us hours every week.",
    name: "Elena R.",
    role: "Program director",
  },
];

export const faqItems = [
  {
    q: "Is my donation tax-deductible?",
    a: "HopeFund is a registered 501(c)(3). You will receive an email receipt suitable for tax records.",
  },
  {
    q: "Can I donate anonymously?",
    a: "Yes. Choose anonymous at checkout; we still email a private receipt to you.",
  },
  {
    q: "How are campaigns vetted?",
    a: "Each campaign passes financial diligence, impact milestones, and quarterly audits.",
  },
  {
    q: "What payment methods are supported?",
    a: "Cards, ACH, Apple Pay, and Google Pay where available.",
  },
];

export const adminUsers = [
  {
    id: "au1",
    name: "Sam Rivera",
    email: "sam@hopefund.org",
    status: "active",
    joined: "2023-01-12",
    donationsCount: 14,
  },
  {
    id: "au2",
    name: "Taylor Brooks",
    email: "taylor@email.com",
    status: "blocked",
    joined: "2024-06-02",
    donationsCount: 2,
  },
  {
    id: "au3",
    name: "Morgan Lee",
    email: "morgan@email.com",
    status: "active",
    joined: "2022-11-20",
    donationsCount: 38,
  },
];

export const adminDonations = [
  {
    id: "d1",
    donor: "Sam Rivera",
    campaign: "Clean Water for Rural Schools",
    amount: 120,
    method: "Card",
    status: "completed",
    date: "2026-05-10",
  },
  {
    id: "d2",
    donor: "Anonymous",
    campaign: "Emergency Shelter Kits",
    amount: 500,
    method: "ACH",
    status: "pending",
    date: "2026-05-11",
  },
  {
    id: "d3",
    donor: "Morgan Lee",
    campaign: "Scholarships for STEM Girls",
    amount: 75,
    method: "Card",
    status: "completed",
    date: "2026-05-12",
  },
  {
    id: "d4",
    donor: "Jordan L.",
    campaign: "Reforest the Highlands",
    amount: 40,
    method: "Wallet",
    status: "failed",
    date: "2026-05-08",
  },
];

export const volunteers = [
  {
    id: "v1",
    name: "Casey Kim",
    email: "casey@email.com",
    skills: ["Logistics", "Events"],
    status: "pending",
    task: "Warehouse sort — May 18",
  },
  {
    id: "v2",
    name: "Riley Chen",
    email: "riley@email.com",
    skills: ["Design", "Social"],
    status: "approved",
    task: "Campaign assets review",
  },
];

export const monthlyStats = [
  { month: "Jan", donations: 12000, campaigns: 4 },
  { month: "Feb", donations: 18500, campaigns: 5 },
  { month: "Mar", donations: 14200, campaigns: 5 },
  { month: "Apr", donations: 22100, campaigns: 6 },
  { month: "May", donations: 19800, campaigns: 6 },
];

export const notificationTemplates = [
  {
    id: "n1",
    title: "Donation successful",
    body: "Thank you! Your gift to Clean Water for Rural Schools is confirmed.",
    type: "success",
    time: "2h ago",
  },
  {
    id: "n2",
    title: "Campaign update",
    body: "Emergency Shelter Kits reached 98% of goal — final stretch!",
    type: "update",
    time: "1d ago",
  },
  {
    id: "n3",
    title: "Reminder",
    body: "Your monthly pledge renews in 3 days.",
    type: "reminder",
    time: "2d ago",
  },
];
