import { PrismaService } from '../../prisma/prisma.service';
export declare class ParticipationsService {
    private prisma;
    constructor(prisma: PrismaService);
    registerForEvent(eventId: string, studentId: string): Promise<{
        event: {
            id: string;
            title: string;
            date: Date | null;
            location: string | null;
        };
        student: {
            id: string;
            email: string;
            fullName: string;
        };
    } & {
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        createdAt: Date;
        eventId: string;
        studentId: string;
    }>;
    getParticipation(eventId: string, studentId: string): Promise<{
        qrCodeDataUrl: string;
        event: {
            id: string;
            title: string;
            description: string;
            date: Date | null;
            location: string | null;
            ticketTemplate: string;
            ticketBackgroundUrl: string | null;
            coverImageUrl: string | null;
            unit: {
                name: string;
                handle: string;
                logoUrl: string | null;
            };
        };
        student: {
            id: string;
            email: string;
            prn: string | null;
            fullName: string;
        };
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        createdAt: Date;
        eventId: string;
        studentId: string;
    }>;
    getStudentRegistrations(studentId: string): Promise<{
        qrCodeDataUrl: string;
        event: {
            status: import(".prisma/client").$Enums.EventStatus;
            id: string;
            title: string;
            description: string;
            date: Date | null;
            location: string | null;
            coverImageUrl: string | null;
            unit: {
                name: string;
                handle: string;
                logoUrl: string | null;
            };
        };
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        createdAt: Date;
        eventId: string;
        studentId: string;
    }[]>;
    cancelRegistration(eventId: string, studentId: string): Promise<{
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        createdAt: Date;
        eventId: string;
        studentId: string;
    }>;
    scanAndCheckIn(qrToken: string, eventId: string): Promise<{
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        createdAt: Date;
        eventId: string;
        studentId: string;
    }>;
    getEventAttendees(eventId: string): Promise<{
        attendees: ({
            student: {
                id: string;
                email: string;
                prn: string | null;
                fullName: string;
                college: {
                    id: string;
                    tenantId: string;
                    name: string;
                } | null;
                course: {
                    id: string;
                    categoryId: string;
                    name: string;
                    durationYears: number;
                } | null;
                specialization: {
                    id: string;
                    courseId: string;
                    name: string;
                } | null;
                batch: {
                    id: string;
                    specializationId: string;
                    name: string;
                    enrollmentYear: number;
                    graduationYear: number;
                } | null;
            };
        } & {
            status: import(".prisma/client").$Enums.ParticipationStatus;
            qrToken: string;
            createdAt: Date;
            eventId: string;
            studentId: string;
        })[];
        stats: {
            total: number;
            registered: number;
            attended: number;
            cancelled: number;
        };
    }>;
    getAttendanceStats(eventId: string): Promise<{
        total: number;
        attended: number;
        registered: number;
        cancelled: number;
        attendanceRate: string;
    }>;
}
