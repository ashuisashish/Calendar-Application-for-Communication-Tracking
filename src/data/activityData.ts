export const activityData = [
  // First group of Email communications (120)
  ...Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    timestamp: "2024-01-15T09:30:00",
    user: "Various Users",
    action: "Email",
    company: "ENTNT",
    details: "Email communications",
  })),

  // LinkedIn Posts (80)
  ...Array.from({ length: 80 }, (_, i) => ({
    id: i + 121,
    timestamp: "2024-01-15T10:15:00",
    user: "Various Users",
    action: "LinkedIn",
    company: "ENTNT",
    details: "LinkedIn communications",
  })),

  // Second group of Email communications (150)
  ...Array.from({ length: 150 }, (_, i) => ({
    id: i + 201,
    timestamp: "2024-01-15T11:00:00",
    user: "Various Users",
    action: "Email",
    company: "ENTNT",
    details: "Email communications",
  })),

  // Phone calls (60)
  ...Array.from({ length: 60 }, (_, i) => ({
    id: i + 351,
    timestamp: "2024-01-15T14:00:00",
    user: "Various Users",
    action: "Phone",
    company: "ENTNT",
    details: "Phone communications",
  })),

  // Chat communications (100)
  ...Array.from({ length: 100 }, (_, i) => ({
    id: i + 411,
    timestamp: "2024-01-15T15:00:00",
    user: "Various Users",
    action: "Chat",
    company: "ENTNT",
    details: "Chat communications",
  })),
];