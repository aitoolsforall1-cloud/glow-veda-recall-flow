export interface Recall {
  id: string;
  product: string;
  batch: string;
  region: string;
  status: "Active" | "In Progress" | "Closed";
  contaminationType: string;
  detectionDate: string;
  notes?: string;
}

export interface Notification {
  id: string;
  recallId: string;
  channel: "Email" | "SMS" | "In-App";
  sent: number;
  delivered: number;
  failed: number;
  ackPercent: number;
}

export interface Acknowledgment {
  userId: string;
  recallId: string;
  action: string;
  timestamp: string;
  userType?: "Customer" | "Retailer";
}

export interface Compliance {
  recallId: string;
  deliveryRate: number;
  ackRate: number;
  SLACompliance: "Met" | "Delayed" | "At Risk";
}

export interface SupportTicket {
  id: string;
  recallId: string;
  customer: string;
  issue: string;
  status: "Open" | "In Progress" | "Closed";
  feedback?: "😊" | "😐" | "😞";
  assignedAgent?: string;
}

export const mockRecalls: Recall[] = [
  {
    id: "RCL-1001",
    product: "GlowVeda Herbal Shampoo",
    batch: "GV-HS-2201",
    region: "North America",
    status: "Active",
    contaminationType: "Microbial Contamination",
    detectionDate: "2025-10-25",
    notes: "High priority - immediate action required"
  },
  {
    id: "RCL-1002",
    product: "GlowVeda Vitamin C Serum",
    batch: "GV-VCS-2210",
    region: "Europe",
    status: "In Progress",
    contaminationType: "Packaging Leakage",
    detectionDate: "2025-10-28"
  },
  {
    id: "RCL-1003",
    product: "GlowVeda Aloe Face Wash",
    batch: "GV-AFW-2110",
    region: "Asia",
    status: "Closed",
    contaminationType: "Labeling Error",
    detectionDate: "2025-09-12"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "NTF-001",
    recallId: "RCL-1001",
    channel: "Email",
    sent: 12000,
    delivered: 11850,
    failed: 150,
    ackPercent: 82
  },
  {
    id: "NTF-002",
    recallId: "RCL-1001",
    channel: "SMS",
    sent: 8000,
    delivered: 7920,
    failed: 80,
    ackPercent: 81
  },
  {
    id: "NTF-003",
    recallId: "RCL-1002",
    channel: "Email",
    sent: 15000,
    delivered: 14940,
    failed: 60,
    ackPercent: 65
  }
];

export const mockAcknowledgments: Acknowledgment[] = [
  {
    userId: "CUST-001",
    recallId: "RCL-1001",
    action: "Requested refund",
    timestamp: "2025-10-27T14:12:00Z",
    userType: "Customer"
  },
  {
    userId: "RET-001",
    recallId: "RCL-1001",
    action: "Returned all units",
    timestamp: "2025-10-27T15:10:00Z",
    userType: "Retailer"
  }
];

export const mockCompliance: Compliance[] = [
  {
    recallId: "RCL-1001",
    deliveryRate: 98.7,
    ackRate: 82,
    SLACompliance: "Met"
  },
  {
    recallId: "RCL-1002",
    deliveryRate: 99.6,
    ackRate: 65,
    SLACompliance: "Delayed"
  },
  {
    recallId: "RCL-1003",
    deliveryRate: 100,
    ackRate: 95,
    SLACompliance: "Met"
  }
];

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "TCK-101",
    recallId: "RCL-1001",
    customer: "Riya Verma",
    issue: "Refund not received yet.",
    status: "Open",
    feedback: "😐",
    assignedAgent: "John Doe"
  },
  {
    id: "TCK-102",
    recallId: "RCL-1001",
    customer: "Michael Chen",
    issue: "Need replacement product urgently",
    status: "In Progress",
    assignedAgent: "Sarah Smith"
  },
  {
    id: "TCK-103",
    recallId: "RCL-1002",
    customer: "Emma Wilson",
    issue: "How to check if my batch is affected?",
    status: "Closed",
    feedback: "😊",
    assignedAgent: "John Doe"
  }
];

export const mockAnalytics = {
  totalActiveRecalls: 2,
  avgDeliveryRate: 99,
  avgAcknowledgmentRate: 82,
  SLACompliancePercent: 95,
  openSupportTickets: 1
};
