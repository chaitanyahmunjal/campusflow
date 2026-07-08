import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export interface DatabaseSeedResult {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable()
export class DatabaseSeedService {
  constructor(private prisma: PrismaService) {}

  /**
   * Seed the database with initial demo data
   */
  async seedDemoData(): Promise<DatabaseSeedResult> {
    try {
      console.log('🌱 Starting database seeding...');

      // Check if already seeded
      const existingTenant = await this.prisma.tenant.findUnique({
        where: { domain: 'default' },
      });

      if (existingTenant) {
        return {
          success: false,
          message: 'Database already seeded',
        };
      }

      // Create Tenant
      const tenant = await this.prisma.tenant.create({
        data: {
          id: 'default',
          name: 'Demo University',
          domain: 'default',
          allowAlumniAccess: true,
        },
      });

      console.log('✅ Created tenant:', tenant.name);

      // Create College
      const college = await this.prisma.college.create({
        data: {
          tenantId: tenant.id,
          name: 'College of Engineering',
        },
      });

      console.log('✅ Created college:', college.name);

      // Create Program Category
      const category = await this.prisma.programCategory.create({
        data: {
          collegeId: college.id,
          name: 'B.Tech Computer Science',
        },
      });

      console.log('✅ Created category:', category.name);

      // Create Course
      const course = await this.prisma.course.create({
        data: {
          categoryId: category.id,
          name: 'Computer Science Engineering',
          durationYears: 4,
        },
      });

      console.log('✅ Created course:', course.name);

      // Create Specialization
      const specialization = await this.prisma.specialization.create({
        data: {
          courseId: course.id,
          name: 'Artificial Intelligence',
        },
      });

      console.log('✅ Created specialization:', specialization.name);

      // Create Batch
      const batch = await this.prisma.batch.create({
        data: {
          specializationId: specialization.id,
          name: '2021-2025',
          enrollmentYear: 2021,
          graduationYear: 2025,
        },
      });

      console.log('✅ Created batch:', batch.name);

      // Create Division
      const division = await this.prisma.division.create({
        data: {
          batchId: batch.id,
          name: 'A',
        },
      });

      console.log('✅ Created division:', division.name);

      // Create Users
      const hashedPassword = await this.hashPassword('password');

      const users = await Promise.all([
        this.prisma.user.create({
          data: {
            tenantId: tenant.id,
            email: 'student@campus.com',
            passwordHash: hashedPassword,
            fullName: 'John Student',
            role: 'STUDENT',
            collegeId: college.id,
            categoryId: category.id,
            courseId: course.id,
            specializationId: specialization.id,
            batchId: batch.id,
            divisionId: division.id,
            prn: '2021CSE001',
          },
        }),
        this.prisma.user.create({
          data: {
            tenantId: tenant.id,
            email: 'organizer@campus.com',
            passwordHash: hashedPassword,
            fullName: 'Jane Organizer',
            role: 'ORGANIZER',
          },
        }),
        this.prisma.user.create({
          data: {
            tenantId: tenant.id,
            email: 'admin@campus.com',
            passwordHash: hashedPassword,
            fullName: 'Admin User',
            role: 'ADMIN',
          },
        }),
        this.prisma.user.create({
          data: {
            tenantId: tenant.id,
            email: 'faculty@campus.com',
            passwordHash: hashedPassword,
            fullName: 'Dr. Faculty',
            role: 'FACULTY',
          },
        }),
      ]);

      console.log(`✅ Created ${users.length} users`);

      // Create Unit (Club)
      const unit = await this.prisma.unit.create({
        data: {
          tenantId: tenant.id,
          name: 'Computer Science Club',
          handle: 'cs-club',
          type: 'CLUB',
          tagline: 'Innovating the Future',
          description: 'A community of tech enthusiasts',
        },
      });

      console.log('✅ Created unit:', unit.name);

      // Add organizer to unit
      await this.prisma.unitOrganizer.create({
        data: {
          unitId: unit.id,
          userId: users[1].id,
        },
      });

      // Create Unit Wallet
      const wallet = await this.prisma.unitWallet.create({
        data: {
          unitId: unit.id,
          allocatedBudget: 100000,
          spentBudget: 0,
          lockedBudget: 0,
        },
      });

      console.log('✅ Created wallet with ₹', wallet.allocatedBudget);

      // Create Event
      const event = await this.prisma.event.create({
        data: {
          unitId: unit.id,
          createdByUserId: users[1].id,
          title: 'Annual Tech Fest 2024',
          description: 'Join us for the biggest technology festival of the year featuring workshops, competitions, and keynote speakers.',
          budgetAmount: 50000,
          status: 'PUBLISHED',
          date: new Date('2024-12-15T09:00:00Z'),
          location: 'Main Auditorium',
          highlights: ['Keynote by Industry Leaders', 'Hackathon', 'Workshops', 'Gaming Tournament'],
        },
      });

      console.log('✅ Created event:', event.title);

      // Create some registrations
      const registration = await this.prisma.participation.create({
        data: {
          eventId: event.id,
          studentId: users[0].id,
          status: 'REGISTERED',
        },
      });

      console.log('✅ Created registration');

      const summary = {
        tenant: tenant.name,
        college: college.name,
        users: users.length,
        unit: unit.name,
        event: event.title,
        wallet: wallet.allocatedBudget,
      };

      console.log('\n🎉 Database seeding completed successfully!');
      console.log('\n📝 Login Credentials:');
      console.log('   Student: student@campus.com / password');
      console.log('   Organizer: organizer@campus.com / password');
      console.log('   Admin: admin@campus.com / password');
      console.log('   Faculty: faculty@campus.com / password');

      return {
        success: true,
        message: 'Database seeded successfully',
        data: summary,
      };
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Reset database (WARNING: Deletes all data)
   */
  async resetDatabase(): Promise<DatabaseSeedResult> {
    try {
      console.log('⚠️  Resetting database...');

      // Delete in correct order to avoid foreign key violations
      await this.prisma.auditLog.deleteMany();
      await this.prisma.notification.deleteMany();
      await this.prisma.participation.deleteMany();
      await this.prisma.event.deleteMany();
      await this.prisma.unitWallet.deleteMany();
      await this.prisma.unitMember.deleteMany();
      await this.prisma.unitOrganizer.deleteMany();
      await this.prisma.unitFaculty.deleteMany();
      await this.prisma.unit.deleteMany();
      await this.prisma.division.deleteMany();
      await this.prisma.batch.deleteMany();
      await this.prisma.specialization.deleteMany();
      await this.prisma.course.deleteMany();
      await this.prisma.programCategory.deleteMany();
      await this.prisma.college.deleteMany();
      await this.prisma.user.deleteMany();
      await this.prisma.tenant.deleteMany();

      console.log('✅ Database reset complete');

      // Re-seed with demo data
      return await this.seedDemoData();
    } catch (error) {
      console.error('❌ Reset failed:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Get seed status
   */
  async getSeedStatus() {
    const tenantCount = await this.prisma.tenant.count();
    const userCount = await this.prisma.user.count();
    const eventCount = await this.prisma.event.count();

    return {
      isSeeded: tenantCount > 0,
      statistics: {
        tenants: tenantCount,
        users: userCount,
        events: eventCount,
      },
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const bcrypt = await import('bcrypt');
    return bcrypt.hash(password, 10);
  }
}