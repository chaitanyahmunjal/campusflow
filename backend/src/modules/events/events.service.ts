import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, status?: EventStatus, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where: any = {
      unit: { tenantId },
    };

    if (status) {
      where.status = status;
    }

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: limit,
        include: {
          unit: {
            include: {
              wallet: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
          constraint: {
            include: {
              targetColleges: { include: { college: true } },
              targetCategories: { include: { category: true } },
              targetCourses: { include: { course: true } },
              targetSpecializations: { include: { specialization: true } },
              targetBatches: { include: { batch: true } },
              targetDivisions: { include: { division: true } },
            },
          },
          _count: {
            select: {
              attendees: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data: events,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        unit: {
          include: {
            wallet: true,
            faculties: { include: { user: true } },
            organizers: { include: { user: true } },
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
        constraint: {
          include: {
            targetColleges: { include: { college: true } },
            targetCategories: { include: { category: true } },
            targetCourses: { include: { course: true } },
            targetSpecializations: { include: { specialization: true } },
            targetBatches: { include: { batch: true } },
            targetDivisions: { include: { division: true } },
          },
        },
        logs: {
          include: {
            reviewedBy: {
              select: {
                id: true,
                fullName: true,
                role: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        attendees: {
          include: {
            student: {
              select: {
                id: true,
                fullName: true,
                email: true,
                college: true,
                course: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async findBySlug(tenantId: string, unitHandle: string, slug: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        slug,
        unit: {
          tenantId,
          handle: unitHandle,
        },
      },
      include: {
        unit: {
          include: {
            wallet: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        constraint: {
          include: {
            targetColleges: { include: { college: true } },
            targetCategories: { include: { category: true } },
            targetCourses: { include: { course: true } },
            targetSpecializations: { include: { specialization: true } },
            targetBatches: { include: { batch: true } },
            targetDivisions: { include: { division: true } },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async create(userId: string, unitId: string, eventData: any) {
    const unit = await this.prisma.unit.findUnique({
      where: { id: unitId },
      include: { wallet: true },
    });

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    if (!unit.wallet) {
      throw new BadRequestException('Unit wallet not initialized');
    }

    const availableBudget = unit.wallet.allocatedBudget - (unit.wallet.spentBudget + unit.wallet.lockedBudget);

    if (eventData.budgetAmount > availableBudget) {
      throw new BadRequestException(
        `Insufficient budget. Available: ${availableBudget}, Requested: ${eventData.budgetAmount}`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.create({
        data: {
          ...eventData,
          unitId,
          createdByUserId: userId,
          status: 'DRAFT',
        },
      });

      if (eventData.budgetAmount > 0) {
        await tx.unitWallet.update({
          where: { unitId },
          data: {
            lockedBudget: { increment: eventData.budgetAmount },
          },
        });
      }

      if (eventData.constraints) {
        await tx.eventConstraint.create({
          data: {
            eventId: event.id,
            targetColleges: eventData.constraints.colleges?.length
              ? {
                  create: eventData.constraints.colleges.map((collegeId: string) => ({
                    collegeId,
                  })),
                }
              : undefined,
            targetCategories: eventData.constraints.categories?.length
              ? {
                  create: eventData.constraints.categories.map((categoryId: string) => ({
                    categoryId,
                  })),
                }
              : undefined,
            targetCourses: eventData.constraints.courses?.length
              ? {
                  create: eventData.constraints.courses.map((courseId: string) => ({
                    courseId,
                  })),
                }
              : undefined,
            targetSpecializations: eventData.constraints.specializations?.length
              ? {
                  create: eventData.constraints.specializations.map((specializationId: string) => ({
                    specializationId,
                  })),
                }
              : undefined,
            targetBatches: eventData.constraints.batches?.length
              ? {
                  create: eventData.constraints.batches.map((batchId: string) => ({
                    batchId,
                  })),
                }
              : undefined,
            targetDivisions: eventData.constraints.divisions?.length
              ? {
                  create: eventData.constraints.divisions.map((divisionId: string) => ({
                    divisionId,
                  })),
                }
              : undefined,
          },
        });
      }

      return event;
    });
  }

  async update(id: string, userId: string, updateData: any) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { unit: { include: { wallet: true } } },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.createdByUserId !== userId) {
      throw new ForbiddenException('You can only update your own events');
    }

    if (event.status !== 'DRAFT' && event.status !== 'NEEDS_REVISION') {
      throw new BadRequestException('Cannot update event in current status');
    }

    const budgetDiff = updateData.budgetAmount - event.budgetAmount;

    return this.prisma.$transaction(async (tx) => {
      if (budgetDiff > 0 && event.unit.wallet) {
        const availableBudget =
          event.unit.wallet.allocatedBudget - (event.unit.wallet.spentBudget + event.unit.wallet.lockedBudget);

        if (budgetDiff > availableBudget) {
          throw new BadRequestException('Insufficient budget for increased amount');
        }

        await tx.unitWallet.update({
          where: { unitId: event.unitId },
          data: {
            lockedBudget: { increment: budgetDiff },
          },
        });
      } else if (budgetDiff < 0) {
        await tx.unitWallet.update({
          where: { unitId: event.unitId },
          data: {
            lockedBudget: { decrement: Math.abs(budgetDiff) },
          },
        });
      }

      if (updateData.constraints) {
        await tx.eventConstraint.delete({
          where: { eventId: id },
        });

        if (Object.keys(updateData.constraints).length > 0) {
          await tx.eventConstraint.create({
            data: {
              eventId: id,
              targetColleges: updateData.constraints.colleges?.length
                ? {
                    create: updateData.constraints.colleges.map((collegeId: string) => ({
                      collegeId,
                    })),
                  }
                : undefined,
              targetCategories: updateData.constraints.categories?.length
                ? {
                    create: updateData.constraints.categories.map((categoryId: string) => ({
                      categoryId,
                    })),
                  }
                : undefined,
              targetCourses: updateData.constraints.courses?.length
                ? {
                    create: updateData.constraints.courses.map((courseId: string) => ({
                      courseId,
                    })),
                  }
                : undefined,
              targetSpecializations: updateData.constraints.specializations?.length
                ? {
                    create: updateData.constraints.specializations.map((specializationId: string) => ({
                      specializationId,
                    })),
                  }
                : undefined,
              targetBatches: updateData.constraints.batches?.length
                ? {
                    create: updateData.constraints.batches.map((batchId: string) => ({
                      batchId,
                    })),
                  }
                : undefined,
              targetDivisions: updateData.constraints.divisions?.length
                ? {
                    create: updateData.constraints.divisions.map((divisionId: string) => ({
                      divisionId,
                    })),
                  }
                : undefined,
            },
          });
        }
      }

      return tx.event.update({
        where: { id },
        data: updateData,
      });
    });
  }

  async submitForApproval(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { unit: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.createdByUserId !== userId) {
      throw new ForbiddenException('You can only submit your own events');
    }

    return this.prisma.event.update({
      where: { id: eventId },
      data: { status: 'PENDING_UNIT_APPROVAL' },
    });
  }

  async approveEvent(eventId: string, reviewedByUserId: string, comments?: string) {
    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: { unit: { include: { wallet: true } } },
      });

      if (!event || !event.unit.wallet) {
        throw new NotFoundException('Event or wallet not found');
      }

      if (event.unit.wallet.lockedBudget < event.budgetAmount) {
        throw new BadRequestException('Insufficient locked budget allocation');
      }

      await tx.unitWallet.update({
        where: { unitId: event.unitId },
        data: {
          lockedBudget: { decrement: event.budgetAmount },
          spentBudget: { increment: event.budgetAmount },
        },
      });

      await tx.event.update({
        where: { id: eventId },
        data: { status: 'APPROVED' },
      });

      await tx.approvalLog.create({
        data: {
          eventId,
          reviewedByUserId,
          action: 'APPROVED',
          comments,
        },
      });

      return event;
    });
  }

  async rejectEvent(eventId: string, reviewedByUserId: string, comments: string) {
    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: { unit: { include: { wallet: true } } },
      });

      if (!event || !event.unit.wallet) {
        throw new NotFoundException('Event or wallet not found');
      }

      await tx.unitWallet.update({
        where: { unitId: event.unitId },
        data: {
          lockedBudget: { decrement: event.budgetAmount },
        },
      });

      await tx.event.update({
        where: { id: eventId },
        data: { status: 'REJECTED' },
      });

      await tx.approvalLog.create({
        data: {
          eventId,
          reviewedByUserId,
          action: 'REJECTED',
          comments,
        },
      });

      return event;
    });
  }

  async publishEvent(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.status !== 'APPROVED') {
      throw new BadRequestException('Only approved events can be published');
    }

    return this.prisma.event.update({
      where: { id: eventId },
      data: { status: 'PUBLISHED' },
    });
  }

  async getEligibleEventsForStudent(studentId: string, tenantId: string) {
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const events = await this.prisma.event.findMany({
      where: {
        unit: { tenantId },
        status: 'PUBLISHED',
      },
      include: {
        unit: {
          select: {
            id: true,
            name: true,
            handle: true,
            logoUrl: true,
          },
        },
        constraint: {
          include: {
            targetColleges: true,
            targetCategories: true,
            targetCourses: true,
            targetSpecializations: true,
            targetBatches: true,
            targetDivisions: true,
          },
        },
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      orderBy: { date: 'asc' },
    });

    return events.filter((event) => {
      const c = event.constraint;
      if (!c) return true;

      if (c.targetColleges.length > 0 && !c.targetColleges.some((tc) => tc.collegeId === student.collegeId)) {
        return false;
      }

      if (
        c.targetCategories.length > 0 &&
        !c.targetCategories.some((tc) => tc.categoryId === student.categoryId)
      ) {
        return false;
      }

      if (c.targetCourses.length > 0 && !c.targetCourses.some((tc) => tc.courseId === student.courseId)) {
        return false;
      }

      if (
        c.targetSpecializations.length > 0 &&
        !c.targetSpecializations.some((tc) => tc.specializationId === student.specializationId)
      ) {
        return false;
      }

      if (c.targetBatches.length > 0 && !c.targetBatches.some((tc) => tc.batchId === student.batchId)) {
        return false;
      }

      if (
        c.targetDivisions.length > 0 &&
        !c.targetDivisions.some((tc) => tc.divisionId === student.divisionId)
      ) {
        return false;
      }

      return true;
    });
  }

  async getEventsForOrganizer(unitId: string) {
    return this.prisma.event.findMany({
      where: { unitId },
      include: {
        constraint: {
          include: {
            targetColleges: true,
            targetCategories: true,
            targetCourses: true,
            targetSpecializations: true,
            targetBatches: true,
            targetDivisions: true,
          },
        },
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getEventsPendingApproval(tenantId: string) {
    return this.prisma.event.findMany({
      where: {
        unit: { tenantId },
        status: {
          in: ['PENDING_UNIT_APPROVAL', 'PENDING_ADMIN_APPROVAL'],
        },
      },
      include: {
        unit: {
          include: {
            wallet: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        constraint: {
          include: {
            targetColleges: { include: { college: true } },
            targetCategories: { include: { category: true } },
            targetCourses: { include: { course: true } },
            targetSpecializations: { include: { specialization: true } },
            targetBatches: { include: { batch: true } },
            targetDivisions: { include: { division: true } },
          },
        },
        logs: {
          include: {
            reviewedBy: {
              select: {
                id: true,
                fullName: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}