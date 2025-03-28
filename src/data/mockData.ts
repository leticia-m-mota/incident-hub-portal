
import { Incident } from "@/types/incident";

export const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    title: "API Gateway Service Outage",
    description: "Complete outage of the API Gateway service affecting all customer-facing applications.",
    status: "open",
    severity: "critical",
    visibility: "public",
    createdAt: "2023-06-15T14:22:00Z",
    updatedAt: "2023-06-15T14:45:00Z",
    detectionSource: "Monitoring Alert",
    assignees: [
      {
        id: "USER001",
        name: "Alex Johnson",
        email: "alex.j@example.com",
        role: "Lead Engineer"
      },
      {
        id: "USER002",
        name: "Morgan Smith",
        email: "morgan.s@example.com",
        role: "SRE"
      }
    ],
    affectedServices: [
      {
        id: "SVC001",
        name: "API Gateway",
        status: "outage"
      },
      {
        id: "SVC002",
        name: "Customer Portal",
        status: "degraded"
      }
    ],
    updates: [
      {
        id: "UPD001",
        incidentId: "INC-001",
        message: "Initial investigation has begun. Team is looking into the root cause.",
        status: "investigating",
        createdAt: "2023-06-15T14:30:00Z",
        createdBy: "Alex Johnson"
      },
      {
        id: "UPD002",
        incidentId: "INC-001",
        message: "Identified issue with load balancer configuration. Working on a fix.",
        status: "identified",
        createdAt: "2023-06-15T14:45:00Z",
        createdBy: "Morgan Smith"
      }
    ],
    tags: ["production", "customer-facing", "api", "outage"]
  },
  {
    id: "INC-002",
    title: "Database Performance Degradation",
    description: "Significant latency observed in database queries affecting transaction processing times.",
    status: "investigating",
    severity: "high",
    visibility: "internal",
    createdAt: "2023-06-14T10:15:00Z",
    updatedAt: "2023-06-14T11:30:00Z",
    detectionSource: "Customer Support",
    assignees: [
      {
        id: "USER003",
        name: "Jamie Lee",
        email: "jamie.l@example.com",
        role: "Database Admin"
      }
    ],
    affectedServices: [
      {
        id: "SVC003",
        name: "Transaction Processing",
        status: "degraded"
      },
      {
        id: "SVC004",
        name: "Reporting Dashboard",
        status: "degraded"
      }
    ],
    updates: [
      {
        id: "UPD003",
        incidentId: "INC-002",
        message: "Investigating slow query performance. Initial indicators point to index fragmentation.",
        status: "investigating",
        createdAt: "2023-06-14T10:30:00Z",
        createdBy: "Jamie Lee"
      }
    ],
    tags: ["database", "performance", "internal", "reporting"]
  },
  {
    id: "INC-003",
    title: "Authentication Service Intermittent Failures",
    description: "Users experiencing sporadic login failures across all platforms.",
    status: "monitoring",
    severity: "medium",
    visibility: "public",
    createdAt: "2023-06-13T08:45:00Z",
    updatedAt: "2023-06-13T12:30:00Z",
    detectionSource: "User Reports",
    assignees: [
      {
        id: "USER004",
        name: "Chris Wong",
        email: "chris.w@example.com",
        role: "Security Engineer"
      },
      {
        id: "USER002",
        name: "Morgan Smith",
        email: "morgan.s@example.com",
        role: "SRE"
      }
    ],
    affectedServices: [
      {
        id: "SVC005",
        name: "Authentication Service",
        status: "degraded"
      }
    ],
    updates: [
      {
        id: "UPD004",
        incidentId: "INC-003",
        message: "Initial investigation started. Checking auth service logs.",
        status: "investigating",
        createdAt: "2023-06-13T09:00:00Z",
        createdBy: "Chris Wong"
      },
      {
        id: "UPD005",
        incidentId: "INC-003",
        message: "Identified issue with rate limiting configuration. Applied temporary fix.",
        status: "identified",
        createdAt: "2023-06-13T10:15:00Z",
        createdBy: "Morgan Smith"
      },
      {
        id: "UPD006",
        incidentId: "INC-003",
        message: "Fix applied, monitoring for recurrence of the issue.",
        status: "monitoring",
        createdAt: "2023-06-13T12:30:00Z",
        createdBy: "Chris Wong"
      }
    ],
    tags: ["auth", "security", "user-impact", "intermittent"]
  },
  {
    id: "INC-004",
    title: "CDN Cache Purge Issue",
    description: "New content not appearing for users due to CDN cache purge failure.",
    status: "resolved",
    severity: "low",
    visibility: "internal",
    createdAt: "2023-06-12T15:30:00Z",
    updatedAt: "2023-06-12T17:45:00Z",
    resolvedAt: "2023-06-12T17:45:00Z",
    detectionSource: "Internal Testing",
    assignees: [
      {
        id: "USER005",
        name: "Jordan River",
        email: "jordan.r@example.com",
        role: "Frontend Developer"
      }
    ],
    affectedServices: [
      {
        id: "SVC006",
        name: "Content Delivery",
        status: "operational"
      }
    ],
    updates: [
      {
        id: "UPD007",
        incidentId: "INC-004",
        message: "Investigating cache purge failures. Content updates not showing for users.",
        status: "investigating",
        createdAt: "2023-06-12T15:45:00Z",
        createdBy: "Jordan River"
      },
      {
        id: "UPD008",
        incidentId: "INC-004",
        message: "Issue identified as API key rotation failure. New key being deployed.",
        status: "identified",
        createdAt: "2023-06-12T16:30:00Z",
        createdBy: "Jordan River"
      },
      {
        id: "UPD009",
        incidentId: "INC-004",
        message: "New API key deployed and tested. Issue resolved.",
        status: "resolved",
        createdAt: "2023-06-12T17:45:00Z",
        createdBy: "Jordan River"
      }
    ],
    tags: ["cdn", "cache", "content", "resolved"]
  },
  {
    id: "INC-005",
    title: "Payment Processing Failure",
    description: "Customers unable to complete payment transactions in the checkout flow.",
    status: "identified",
    severity: "critical",
    visibility: "public",
    createdAt: "2023-06-16T09:10:00Z",
    updatedAt: "2023-06-16T10:25:00Z",
    detectionSource: "Revenue Monitoring",
    assignees: [
      {
        id: "USER006",
        name: "Taylor Kim",
        email: "taylor.k@example.com",
        role: "Payment Systems Lead"
      },
      {
        id: "USER007",
        name: "Riley Jones",
        email: "riley.j@example.com",
        role: "Backend Developer"
      }
    ],
    affectedServices: [
      {
        id: "SVC007",
        name: "Payment Gateway",
        status: "outage"
      },
      {
        id: "SVC008",
        name: "Checkout Service",
        status: "degraded"
      }
    ],
    updates: [
      {
        id: "UPD010",
        incidentId: "INC-005",
        message: "Multiple reports of payment failures coming in. Investigating urgently.",
        status: "investigating",
        createdAt: "2023-06-16T09:20:00Z",
        createdBy: "Taylor Kim"
      },
      {
        id: "UPD011",
        incidentId: "INC-005",
        message: "Identified issue with payment processor API. Their status page now showing an outage as well.",
        status: "identified",
        createdAt: "2023-06-16T10:25:00Z",
        createdBy: "Riley Jones"
      }
    ],
    tags: ["payments", "critical", "revenue", "third-party"]
  }
];

export const mockMetricsData = {
  incidentsByMonth: [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 7 },
    { month: 'Jun', count: 5 },
  ],
  resolutionTimes: [
    { severity: 'Critical', avgTime: 245 }, // minutes
    { severity: 'High', avgTime: 410 },
    { severity: 'Medium', avgTime: 890 },
    { severity: 'Low', avgTime: 1450 },
  ],
  incidentsBySeverity: [
    { severity: 'Critical', count: 8 },
    { severity: 'High', count: 15 },
    { severity: 'Medium', count: 23 },
    { severity: 'Low', count: 18 },
  ],
  serviceAvailability: [
    { service: 'API Gateway', availability: 99.92 },
    { service: 'Authentication', availability: 99.95 },
    { service: 'Database', availability: 99.99 },
    { service: 'Storage', availability: 99.97 },
    { service: 'Payments', availability: 99.85 },
    { service: 'Search', availability: 99.90 },
  ]
};
