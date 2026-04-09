import { NextResponse } from "next/server";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  status: "active" | "inactive" | "prospect";
  createdAt: string;
}

const customers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "0400 123 456",
    address: "123 Main St",
    suburb: "Subiaco",
    totalBookings: 5,
    totalSpent: 900,
    lastBooking: "2026-04-09",
    status: "active",
    createdAt: "2025-06-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "0412 345 678",
    address: "45 Queen Street",
    suburb: "West Perth",
    totalBookings: 12,
    totalSpent: 2400,
    lastBooking: "2026-04-08",
    status: "active",
    createdAt: "2024-03-20T14:30:00Z",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "0405 987 654",
    address: "78 Business Ave",
    suburb: "Osborne Park",
    totalBookings: 3,
    totalSpent: 450,
    lastBooking: "2026-04-07",
    status: "prospect",
    createdAt: "2026-01-10T09:00:00Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: customers,
    total: customers.length,
    stats: {
      active: customers.filter((c) => c.status === "active").length,
      inactive: customers.filter((c) => c.status === "inactive").length,
      prospect: customers.filter((c) => c.status === "prospect").length,
      totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    },
  });
}