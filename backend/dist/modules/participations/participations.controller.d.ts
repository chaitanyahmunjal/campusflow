import { ParticipationsService } from './participations.service';
export declare class ParticipationsController {
    private participationsService;
    constructor(participationsService: ParticipationsService);
    registerForEvent(user: any, eventId: string): Promise<{
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
        createdAt: Date;
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        eventId: string;
        studentId: string;
    }>;
    getMyRegistrations(user: any): Promise<{
        qrCodeDataUrl: string;
        event: {
            id: string;
            unit: {
                name: string;
                handle: string;
                logoUrl: string | null;
            };
            description: string;
            status: import(".prisma/client").$Enums.EventStatus;
            title: string;
            date: Date | null;
            location: string | null;
            coverImageUrl: string | null;
        };
        createdAt: Date;
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        eventId: string;
        studentId: string;
    }[]>;
    getParticipation(eventId: string, studentId: string): Promise<{
        qrCodeDataUrl: string;
        event: {
            id: string;
            unit: {
                name: string;
                handle: string;
                logoUrl: string | null;
            };
            description: string;
            title: string;
            date: Date | null;
            location: string | null;
            ticketTemplate: string;
            ticketBackgroundUrl: string | null;
            coverImageUrl: string | null;
        };
        student: {
            id: string;
            email: string;
            prn: string | null;
            fullName: string;
        };
        createdAt: Date;
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        eventId: string;
        studentId: string;
    }>;
    cancelRegistration(user: any, eventId: string): Promise<{
        createdAt: Date;
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        eventId: string;
        studentId: string;
    }>;
    scanAndCheckIn(user: any, body: {
        qrToken: string;
        eventId: string;
    }): Promise<{
        createdAt: Date;
        status: import(".prisma/client").$Enums.ParticipationStatus;
        qrToken: string;
        eventId: string;
        studentId: string;
    }>;
    getAttendees(eventId: string): Promise<{
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
            createdAt: Date;
            status: import(".prisma/client").$Enums.ParticipationStatus;
            qrToken: string;
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
    getStats(eventId: string): Promise<{
        total: number;
        attended: number;
        registered: number;
        cancelled: number;
        attendanceRate: string;
    }>;
}
