import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UnitType } from '@prisma/client';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, type?: UnitType) {
    const where: any = { tenantId };
    if (type) {
      where.type = type;
    }

    return this.prisma.unit.findMany({
      where,
      include: {
        wallet: true,
        faculties: { include: { user: { select: { id: true, fullName: true, email: true } } } },
        organizers: { include: { user: { select: { id: true, fullName: true, email: true } } } },
        members: { include: { user: { select: { id: true, fullName: true, email: true } } } },
        _count: {
          select: {
            events: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
      include: {
        wallet: true,
        faculties: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        organizers: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
              },
            },
          },
        },
        events: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return unit;
  }

  async findByHandle(tenantId: string, handle: string) {
    const unit = await this.prisma.unit.findUnique({
      where: {
        tenantId_handle: {
          tenantId,
          handle,
        },
      },
      include: {
        wallet: true,
        faculties: { include: { user: true } },
        organizers: { include: { user: true } },
        members: { include: { user: true } },
        events: {
          where: { status: 'PUBLISHED' },
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return unit;
  }

  async create(tenantId: string, unitData: any) {
    const existingUnit = await this.prisma.unit.findUnique({
      where: {
        tenantId_handle: {
          tenantId,
          handle: unitData.handle,
        },
      },
    });

    if (existingUnit) {
      throw new ConflictException('Unit with this handle already exists');
    }

    return this.prisma.$transaction(async (tx) => {
      const unit = await tx.unit.create({
        data: {
          ...unitData,
          tenantId,
        },
      });

      await tx.unitWallet.create({
        data: {
          unitId: unit.id,
          allocatedBudget: unitData.initialBudget || 0,
        },
      });

      return unit;
    });
  }

  async update(id: string, updateData: any) {
    if (updateData.handle) {
      const existingUnit = await this.prisma.unit.findUnique({
        where: { id },
      });

      if (existingUnit && existingUnit.handle !== updateData.handle) {
        const unitWithNewHandle = await this.prisma.unit.findUnique({
          where: {
            tenantId_handle: {
              tenantId: existingUnit.tenantId,
              handle: updateData.handle,
            },
          },
        });

        if (unitWithNewHandle) {
          throw new ConflictException('Unit with this handle already exists');
        }
      }
    }

    return this.prisma.unit.update({
      where: { id },
      data: updateData,
      include: { wallet: true },
    });
  }

  async remove(id: string) {
    await this.prisma.unit.delete({
      where: { id },
    });

    return { message: 'Unit deleted successfully' };
  }

  async addFaculty(unitId: string, userId: string) {
    const existing = await this.prisma.unitFaculty.findUnique({
      where: {
        unitId_userId: {
          unitId,
          userId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('User is already a faculty of this unit');
    }

    return this.prisma.unitFaculty.create({
      data: { unitId, userId },
    });
  }

  async removeFaculty(unitId: string, userId: string) {
    await this.prisma.unitFaculty.delete({
      where: {
        unitId_userId: {
          unitId,
          userId,
        },
      },
    });

    return { message: 'Faculty removed successfully' };
  }

  async addOrganizer(unitId: string, userId: string) {
    const existing = await this.prisma.unitOrganizer.findUnique({
      where: {
        unitId_userId: {
          unitId,
          userId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('User is already an organizer of this unit');
    }

    return this.prisma.unitOrganizer.create({
      data: { unitId, userId },
    });
  }

  async removeOrganizer(unitId: string, userId: string) {
    await this.prisma.unitOrganizer.delete({
      where: {
        unitId_userId: {
          unitId,
          userId,
        },
      },
    });

    return { message: 'Organizer removed successfully' };
  }

  async addMember(unitId: string, userId: string) {
    const existing = await this.prisma.unitMember.findUnique({
      where: {
        unitId_userId: {
          unitId,
          userId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('User is already a member of this unit');
    }

    return this.prisma.unitMember.create({
      data: { unitId, userId },
    });
  }

  async removeMember(unitId: string, userId: string) {
    await this.prisma.unitMember.delete({
      where: {
        unitId_userId: {
          unitId,
          userId,
        },
      },
    });

    return { message: 'Member removed successfully' };
  }

  async getWallet(unitId: string) {
    const wallet = await this.prisma.unitWallet.findUnique({
      where: { unitId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async updateBudget(unitId: string, allocatedBudget: number) {
    return this.prisma.unitWallet.upsert({
      where: { unitId },
      update: { allocatedBudget },
      create: {
        unitId,
        allocatedBudget,
        spentBudget: 0,
        lockedBudget: 0,
      },
    });
  }

  async getAvailableBudget(unitId: string) {
    const wallet = await this.prisma.unitWallet.findUnique({
      where: { unitId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const available = wallet.allocatedBudget - (wallet.spentBudget + wallet.lockedBudget);

    return {
      allocated: wallet.allocatedBudget,
      spent: wallet.spentBudget,
      locked: wallet.lockedBudget,
      available,
    };
  }
}