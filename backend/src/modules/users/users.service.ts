import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where: any = { tenantId };

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { fullName: { contains: search, mode: 'insensitive' } },
        { prn: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          college: true,
          category: true,
          course: true,
          specialization: true,
          batch: true,
          division: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        tenant: true,
        college: true,
        category: true,
        course: true,
        specialization: true,
        batch: true,
        division: true,
        facultyUnits: { include: { unit: true } },
        organizerUnits: { include: { unit: true } },
        memberUnits: { include: { unit: true } },
        createdEvents: true,
        participations: { include: { event: true } },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async update(id: string, updateData: any) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        college: true,
        category: true,
        course: true,
        specialization: true,
        batch: true,
        division: true,
      },
    });

    const { passwordHash, ...result } = user;
    return result;
  }

  async remove(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    return { message: 'User deactivated successfully' };
  }

  async findByRole(tenantId: string, role: Role, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: { tenantId, role },
        skip,
        take: limit,
        include: {
          college: true,
          category: true,
          course: true,
          specialization: true,
          batch: true,
          division: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where: { tenantId, role } }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}