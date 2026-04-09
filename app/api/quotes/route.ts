import { NextResponse } from "next/server";

interface Quote {
  id: string;
  service: string;
  bedrooms: number;
  bathrooms: number;
  frequency: string;
  estimatedPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  suburb: string;
  status: "new" | "contacted" | "quoted" | "accepted" | "rejected";
  createdAt: string;
}

const quotes: Quote[] = [
  {
    id: "1",
    service: "House Cleaning",
    bedrooms: 3,
    bathrooms: 2,
    frequency: "Weekly",
    estimatedPrice: 180,
    customerName: "Jane Doe",
    customerEmail: "jane@example.com",
    customerPhone: "0400 111 222",
    suburb: "Mount Hawthorn",
    status: "new",
    createdAt: "2026-04-09T08:00:00Z",
  },
  {
    id: "2",
    service: "End of Lease Cleaning",
    bedrooms: 4,
    bathrooms: 2,
    frequency: "One-off",
    estimatedPrice: 350,
    customerName: "Tom Brown",
    customerEmail: "tom@example.com",
    customerPhone: "0401 222 333",
    suburb: "Floreat",
    status: "contacted",
    createdAt: "2026-04-08T14:00:00Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: quotes,
    total: quotes.length,
    stats: {
      new: quotes.filter((q) => q.status === "new").length,
      contacted: quotes.filter((q) => q.status === "contacted").length,
      quoted: quotes.filter((q) => q.status === "quoted").length,
      accepted: quotes.filter((q) => q.status === "accepted").length,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newQuote: Quote = {
      id: String(Date.now()),
      ...body,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    quotes.push(newQuote);
    return NextResponse.json({
      success: true,
      message: "Quote request created successfully",
      data: newQuote,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }
}