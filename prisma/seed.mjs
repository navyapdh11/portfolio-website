import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample customers
  const customer1 = await prisma.customer.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      name: 'Sarah Thompson',
      email: 'sarah@example.com',
      phone: '0412345678',
      addresses: [{ street: '123 Bondi Rd', suburb: 'Bondi', state: 'NSW', postcode: '2026' }],
      loyaltyPoints: 150,
      totalBookings: 12,
      totalSpent: 1440,
      status: 'active',
    },
  });

  const customer2 = await prisma.customer.upsert({
    where: { email: 'michael@example.com' },
    update: {},
    create: {
      name: 'Michael Chen',
      email: 'michael@example.com',
      phone: '0423456789',
      addresses: [{ street: '45 Chapel St', suburb: 'South Yarra', state: 'VIC', postcode: '3141' }],
      loyaltyPoints: 200,
      totalBookings: 24,
      totalSpent: 4320,
      status: 'active',
    },
  });

  // Create sample bookings
  await prisma.booking.createMany({
    data: [
      {
        customerId: customer1.id,
        customerName: 'Sarah Thompson',
        customerEmail: 'sarah@example.com',
        customerPhone: '0412345678',
        service: 'End of Lease Cleaning',
        address: '123 Bondi Rd',
        suburb: 'Bondi',
        state: 'NSW',
        date: new Date('2026-05-15'),
        time: '09:00',
        frequency: 'one-time',
        addons: ['Carpet Cleaning', 'Window Cleaning'],
        status: 'completed',
        totalPrice: 450,
      },
      {
        customerId: customer2.id,
        customerName: 'Michael Chen',
        customerEmail: 'michael@example.com',
        customerPhone: '0423456789',
        service: 'Commercial Cleaning',
        address: '45 Chapel St',
        suburb: 'South Yarra',
        state: 'VIC',
        date: new Date('2026-05-20'),
        time: '18:00',
        frequency: 'weekly',
        addons: [],
        status: 'confirmed',
        totalPrice: 220,
      },
      {
        customerName: 'Emma Wilson',
        customerEmail: 'emma@example.com',
        customerPhone: '0434567890',
        service: 'Deep Cleaning',
        address: '78 James St',
        suburb: 'New Farm',
        state: 'QLD',
        date: new Date('2026-05-25'),
        time: '08:00',
        frequency: 'one-time',
        addons: ['Oven Cleaning'],
        status: 'pending',
        totalPrice: 350,
      },
    ],
  });

  // Create sample quotes
  await prisma.quote.createMany({
    data: [
      {
        customerName: 'David Martinez',
        customerEmail: 'david@example.com',
        customerPhone: '0445678901',
        service: 'Domestic Cleaning',
        bedrooms: 3,
        bathrooms: 2,
        frequency: 'fortnightly',
        estimatedPrice: 180,
        suburb: 'Subiaco',
        state: 'WA',
        status: 'new',
      },
      {
        customerName: 'Lisa Anderson',
        customerEmail: 'lisa@example.com',
        customerPhone: '0456789012',
        service: 'Carpet Cleaning',
        bedrooms: 4,
        bathrooms: 2,
        frequency: 'one-time',
        estimatedPrice: 280,
        suburb: 'North Adelaide',
        state: 'SA',
        status: 'contacted',
      },
    ],
  });

  console.log('✅ Seed data inserted successfully');
  console.log(`   Customers: ${await prisma.customer.count()}`);
  console.log(`   Bookings: ${await prisma.booking.count()}`);
  console.log(`   Quotes: ${await prisma.quote.count()}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
