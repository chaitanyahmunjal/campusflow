"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const QRCode = require("qrcode");
let ParticipationsService = class ParticipationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerForEvent(eventId, studentId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: { constraint: true },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.status !== 'PUBLISHED') {
            throw new common_1.BadRequestException('Event is not open for registration');
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
                throw new common_1.BadRequestException('Registration was cancelled');
            }
            throw new common_1.ConflictException('Already registered for this event');
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
    async getParticipation(eventId, studentId) {
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
            throw new common_1.NotFoundException('Participation not found');
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
    async getStudentRegistrations(studentId) {
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
        return Promise.all(participations.map(async (p) => {
            const qrCodeDataUrl = await QRCode.toDataURL(p.qrToken, {
                width: 200,
                margin: 2,
            });
            return {
                ...p,
                qrCodeDataUrl,
            };
        }));
    }
    async cancelRegistration(eventId, studentId) {
        const participation = await this.prisma.participation.findUnique({
            where: {
                eventId_studentId: {
                    eventId,
                    studentId,
                },
            },
        });
        if (!participation) {
            throw new common_1.NotFoundException('Registration not found');
        }
        if (participation.status === 'ATTENDED') {
            throw new common_1.BadRequestException('Cannot cancel attendance after attending');
        }
        if (participation.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Registration already cancelled');
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
    async scanAndCheckIn(qrToken, eventId) {
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
            throw new common_1.NotFoundException('Invalid ticket for this event');
        }
        if (participation.status === 'ATTENDED') {
            throw new common_1.BadRequestException('Ticket already scanned');
        }
        if (participation.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Registration was cancelled');
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
    async getEventAttendees(eventId) {
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
    async getAttendanceStats(eventId) {
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
};
exports.ParticipationsService = ParticipationsService;
exports.ParticipationsService = ParticipationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParticipationsService);
//# sourceMappingURL=participations.service.js.map