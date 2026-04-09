import { NextResponse } from "next/server";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const bookings: Booking[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "0400 123 456",
    service: "House Cleaning",
    address: "123 Main St, Subiaco",
    date: "2026-04-15",
    time: "09:00",
    status: "pending",
    createdAt: "2026-04-09T10:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "0412 345 678",
    service: "End of Lease Cleaning",
    address: "45 Queen St, West Perth",
    date: "2026-04-12",
    time: "14:00",
    status: "confirmed",
    createdAt: "2026-04-08T15:30:00Z",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "0405 987 654",
    service: "Commercial Cleaning",
    address: "78 Business Ave, Osborne Park",
    date: "2026-04-10",
    time: "08:00",
    status: "completed",
    createdAt: "2026-04-07T09:00:00Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: bookings,
    total: bookings.length,
    stats: {
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBooking: Booking = {
      id: String(Date.now()),
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }
}