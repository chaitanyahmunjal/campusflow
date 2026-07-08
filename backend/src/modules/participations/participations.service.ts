import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ParticipationStatus } from '@prisma/client';
import * as QRCode from 'qrcode';

@Injectable()
export class ParticipationsService {
  constructor(private prisma: PrismaService) {}

  async registerForEvent(eventId: string, studentId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { constraint: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.status !== 'PUBLISHED') {
      throw new BadRequestException('Event is not open for registration');
    }

    const existingRegistration = await this.prisma.participation.findUnique({
      where: {
        eventId_studentId: {
          eventId,
          studentId,
        },
      },
    });

    if (existingRegistration) {
      if (existingRegistration.status === 'CANCELLED') {
        throw new BadRequestException('Registration was cancelled');
      }
      throw new ConflictException('Already registered for this event');
    }

    const participation = await this.prisma.participation.create({
      data: {
        eventId,
        studentId,
        status: 'REGISTERED',
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
          },
        },
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return participation;
  }

  async getParticipation(eventId: string, studentId: string) {
    const participation = await this.prisma.participation.findUnique({
      where: {
        eventId_studentId: {
          eventId,
          studentId,
        },
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            location: true,
            coverImageUrl: true,
            ticketTemplate: true,
            ticketBackgroundUrl: true,
            unit: {
              select: {
                name: true,
                handle: true,
                logoUrl: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            prn: true,
          },
        },
      },
    });

    if (!participation) {
      throw new NotFoundException('Participation not found');
    }

    const qrCodeDataUrl = await QRCode.toDataURL(participation.qrToken, {
      width: 300,
      margin: 2,
      errorCorrectionLevel: 'M',
    });

    return {
      ...participation,
      qrCodeDataUrl,
    };
  }

  async getStudentRegistrations(studentId: string) {
    const participations = await this.prisma.participation.findMany({
      where: { studentId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            location: true,
            status: true,
            coverImageUrl: true,
            unit: {
              select: {
                name: true,
                handle: true,
                logoUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return Promise.all(
      participations.map(async (p) => {
        const qrCodeDataUrl = await QRCode.toDataURL(p.qrToken, {
          width: 200,
          margin: 2,
        });
        return {
          ...p,
          qrCodeDataUrl,
        };
      }),
    );
  }

  async cancelRegistration(eventId: string, studentId: string) {
    const participation = await this.prisma.participation.findUnique({
      where: {
        eventId_studentId: {
          eventId,
          studentId,
        },
      },
    });

    if (!participation) {
      throw new NotFoundException('Registration not found');
    }

    if (participation.status === 'ATTENDED') {
      throw new BadRequestException('Cannot cancel attendance after attending');
    }

    if (participation.status === 'CANCELLED') {
      throw new BadRequestException('Registration already cancelled');
    }

    return this.prisma.participation.update({
      where: {
        eventId_studentId: {
          eventId,
          studentId,
        },
      },
      data: { status: 'CANCELLED' },
    });
  }

  async scanAndCheckIn(qrToken: string, eventId: string) {
    const participation = await this.prisma.participation.findFirst({
      where: { qrToken, eventId },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            prn: true,
            college: true,
            course: true,
          },
        },
        event: {
          select: {
            title: true,
            date: true,
          },
        },
      },
    });

    if (!participation) {
      throw new NotFoundException('Invalid ticket for this event');
    }

    if (participation.status === 'ATTENDED') {
      throw new BadRequestException('Ticket already scanned');
    }

    if (participation.status === 'CANCELLED') {
      throw new BadRequestException('Registration was cancelled');
    }

    return this.prisma.participation.update({
      where: {
        eventId_studentId: {
          eventId: participation.eventId,
          studentId: participation.studentId,
        },
      },
      data: { status: 'ATTENDED' },
    });
  }

  async getEventAttendees(eventId: string) {
    const attendees = await this.prisma.participation.findMany({
      where: { eventId },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            prn: true,
            college: true,
            course: true,
            specialization: true,
            batch: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const stats = {
      total: attendees.length,
      registered: attendees.filter((a) => a.status === 'REGISTERED').length,
      attended: attendees.filter((a) => a.status === 'ATTENDED').length,
      cancelled: attendees.filter((a) => a.status === 'CANCELLED').length,
    };

    return { attendees, stats };
  }

  async getAttendanceStats(eventId: string) {
    const attendees = await this.prisma.participation.findMany({
      where: { eventId },
    });

    const total = attendees.length;
    const attended = attendees.filter((a) => a.status === 'ATTENDED').length;
    const registered = attendees.filter((a) => a.status === 'REGISTERED').length;
    const cancelled = attendees.filter((a) => a.status === 'CANCELLED').length;

    return {
      total,
      attended,
      registered,
      cancelled,
      attendanceRate: total > 0 ? ((attended / total) * 100).toFixed(2) : '0',
    };
  }
}