import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    booking: {
      create: vi.fn(),
    },
  },
}));

vi.mock('@/lib/middleware/auth', () => ({
  validateAuth: vi.fn(),
}));

vi.mock('@/lib/middleware/csrf', () => ({
  csrfResponse: vi.fn(() => null),
}));

describe('POST /api/bookings', () => {
  it('should create a booking with valid input', async () => {
    const validBooking = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      service: 'Cleaning',
      date: '2026-05-01',
    };

    const request = new Request('http://localhost/api/bookings', {
      method: 'POST',
      body: JSON.stringify(validBooking),
    });

    (prisma.booking.create as any).mockResolvedValue({ id: '1', ...validBooking });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(prisma.booking.create).toHaveBeenCalled();
  });

  it('should return 400 for invalid input', async () => {
    const invalidBooking = {
      name: '',
      email: 'invalid-email',
    };

    const request = new Request('http://localhost/api/bookings', {
      method: 'POST',
      body: JSON.stringify(invalidBooking),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
