import { PrismaClient, Role, UnitType, EventStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create Tenant
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'campus.com' },
    update: {},
    create: {
      name: 'Campus University',
      domain: 'campus.com',
      allowAlumniAccess: true,
    },
  });
  console.log(`✅ Created tenant: ${tenant.name}`);

  // Create College
  const college = await prisma.college.create({
    data: {
      tenantId: tenant.id,
      name: 'College of Engineering',
    },
  });
  console.log(`✅ Created college: ${college.name}`);

  // Create Program Category
  const category = await prisma.programCategory.create({
    data: {
      collegeId: college.id,
      name: 'B.Tech Computer Science',
    },
  });
  console.log(`✅ Created category: ${category.name}`);

  // Create Course
  const course = await prisma.course.create({
    data: {
      categoryId: category.id,
      name: 'Computer Science Engineering',
      durationYears: 4,
    },
  });
  console.log(`✅ Created course: ${course.name}`);

  // Create Specialization
  const specialization = await prisma.specialization.create({
    data: {
      courseId: course.id,
      name: 'Artificial Intelligence',
    },
  });
  console.log(`✅ Created specialization: ${specialization.name}`);

  // Create Batch
  const batch = await prisma.batch.create({
    data: {
      specializationId: specialization.id,
      name: '2021-2025',
      enrollmentYear: 2021,
      graduationYear: 2025,
    },
  });
  console.log(`✅ Created batch: ${batch.name}`);

  // Create Division
  const division = await prisma.division.create({
    data: {
      batchId: batch.id,
      name: 'A',
    },
  });
  console.log(`✅ Created division: ${division.name}`);

  // Create Users
  const hashedPassword = await bcrypt.hash('password', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: 'superadmin@campus.com' } },
      update: {},
      create: {
        tenantId: tenant.id,
        email: 'superadmin@campus.com',
        passwordHash: hashedPassword,
        fullName: 'Super Admin',
        role: Role.SUPER_ADMIN,
      },
    }),
    prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: 'admin@campus.com' } },
      update: {},
      create: {
        tenantId: tenant.id,
        email: 'admin@campus.com',
        passwordHash: hashedPassword,
        fullName: 'College Admin',
        role: Role.ADMIN,
      },
    }),
    prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: 'faculty@campus.com' } },
      update: {},
      create: {
        tenantId: tenant.id,
        email: 'faculty@campus.com',
        passwordHash: hashedPassword,
        fullName: 'Faculty Member',
        role: Role.FACULTY,
      },
    }),
    prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: 'organizer@campus.com' } },
      update: {},
      create: {
        tenantId: tenant.id,
        email: 'organizer@campus.com',
        passwordHash: hashedPassword,
        fullName: 'Event Organizer',
        role: Role.ORGANIZER,
      },
    }),
    prisma.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: 'student@campus.com' } },
      update: {},
      create: {
        tenantId: tenant.id,
        email: 'student@campus.com',
        passwordHash: hashedPassword,
        fullName: 'John Student',
        role: Role.STUDENT,
        collegeId: college.id,
        categoryId: category.id,
        courseId: course.id,
        specializationId: specialization.id,
        batchId: batch.id,
        divisionId: division.id,
        prn: '2021CSE001',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create Unit (Club)
  const unit = await prisma.unit.create({
    data: {
      tenantId: tenant.id,
      name: 'Computer Science Club',
      handle: 'cs-club',
      type: UnitType.CLUB,
      tagline: 'Innovating the Future',
      description: 'A community of tech enthusiasts exploring cutting-edge technologies',
      about: 'The Computer Science Club is the largest technical club on campus, organizing hackathons, workshops, and tech talks throughout the year.',
    },
  });
  console.log(`✅ Created unit: ${unit.name}`);

  // Add organizer to unit
  await prisma.unitOrganizer.create({
    data: {
      unitId: unit.id,
      userId: users[3].id, // Organizer user
    },
  });

  // Create Unit Wallet
  const wallet = await prisma.unitWallet.create({
    data: {
      unitId: unit.id,
      allocatedBudget: 100000,
      spentBudget: 0,
      lockedBudget: 0,
    },
  });
  console.log(`✅ Created wallet with ₹${wallet.allocatedBudget} budget`);

  // Create Sample Event
  const event = await prisma.event.create({
    data: {
      unitId: unit.id,
      createdByUserId: users[3].id,
      title: 'Annual Tech Fest 2024',
      description: 'Join us for the biggest technology festival of the year featuring workshops, competitions, and keynote speakers from top tech companies.',
      budgetAmount: 50000,
      status: EventStatus.PUBLISHED,
      date: new Date('2024-12-15T09:00:00Z'),
      location: 'Main Auditorium',
      highlights: ['Keynote by Industry Leaders', 'Hackathon with ₹1L Prize Pool', 'Workshops on AI/ML', 'Gaming Tournament'],
    },
  });
  console.log(`✅ Created event: ${event.title}`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📝 Login Credentials:');
  console.log('   Super Admin: superadmin@campus.com / password');
  console.log('   Admin: admin@campus.com / password');
  console.log('   Faculty: faculty@campus.com / password');
  console.log('   Organizer: organizer@campus.com / password');
  console.log('   Student: student@campus.com / password');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });