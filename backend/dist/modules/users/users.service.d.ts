import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, page?: number, limit?: number, search?: string): Promise<{
        data: ({
            college: {
                name: string;
                id: string;
                tenantId: string;
            } | null;
            course: {
                name: string;
                id: string;
                categoryId: string;
                durationYears: number;
            } | null;
            specialization: {
                name: string;
                id: string;
                courseId: string;
            } | null;
            batch: {
                name: string;
                id: string;
                specializationId: string;
                enrollmentYear: number;
                graduationYear: number;
            } | null;
            division: {
                name: string;
                id: string;
                batchId: string;
            } | null;
            category: {
                name: string;
                id: string;
                collegeId: string;
            } | null;
        } & {
            role: import(".prisma/client").$Enums.Role;
            id: string;
            tenantId: string | null;
            email: string;
            prn: string | null;
            passwordHash: string | null;
            fullName: string;
            isActive: boolean;
            createdAt: Date;
            collegeId: string | null;
            categoryId: string | null;
            courseId: string | null;
            specializationId: string | null;
            batchId: string | null;
            divisionId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        tenant: {
            name: string;
            id: string;
            createdAt: Date;
            domain: string;
            allowAlumniAccess: boolean;
            updatedAt: Date;
        } | null;
        college: {
            name: string;
            id: string;
            tenantId: string;
        } | null;
        course: {
            name: string;
            id: string;
            categoryId: string;
            durationYears: number;
        } | null;
        specialization: {
            name: string;
            id: string;
            courseId: string;
        } | null;
        batch: {
            name: string;
            id: string;
            specializationId: string;
            enrollmentYear: number;
            graduationYear: number;
        } | null;
        division: {
            name: string;
            id: string;
            batchId: string;
        } | null;
        category: {
            name: string;
            id: string;
            collegeId: string;
        } | null;
        facultyUnits: ({
            unit: {
                type: import(".prisma/client").$Enums.UnitType;
                name: string;
                description: string | null;
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                handle: string;
                tagline: string | null;
                about: string | null;
                logoUrl: string | null;
                coverUrl: string | null;
                websiteUrl: string | null;
                socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        organizerUnits: ({
            unit: {
                type: import(".prisma/client").$Enums.UnitType;
                name: string;
                description: string | null;
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                handle: string;
                tagline: string | null;
                about: string | null;
                logoUrl: string | null;
                coverUrl: string | null;
                websiteUrl: string | null;
                socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        memberUnits: ({
            unit: {
                type: import(".prisma/client").$Enums.UnitType;
                name: string;
                description: string | null;
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                handle: string;
                tagline: string | null;
                about: string | null;
                logoUrl: string | null;
                coverUrl: string | null;
                websiteUrl: string | null;
                socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        createdEvents: {
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.EventStatus;
            date: Date | null;
            unitId: string;
            createdByUserId: string;
            title: string;
            budgetAmount: number;
            location: string | null;
            ticketTemplate: string;
            ticketBackgroundUrl: string | null;
            coverImageUrl: string | null;
            highlights: import("@prisma/client/runtime/library").JsonValue | null;
            schedule: import("@prisma/client/runtime/library").JsonValue | null;
            speakers: import("@prisma/client/runtime/library").JsonValue | null;
            rules: import("@prisma/client/runtime/library").JsonValue | null;
            slug: string;
        }[];
        participations: ({
            event: {
                description: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.EventStatus;
                date: Date | null;
                unitId: string;
                createdByUserId: string;
                title: string;
                budgetAmount: number;
                location: string | null;
                ticketTemplate: string;
                ticketBackgroundUrl: string | null;
                coverImageUrl: string | null;
                highlights: import("@prisma/client/runtime/library").JsonValue | null;
                schedule: import("@prisma/client/runtime/library").JsonValue | null;
                speakers: import("@prisma/client/runtime/library").JsonValue | null;
                rules: import("@prisma/client/runtime/library").JsonValue | null;
                slug: string;
            };
        } & {
            createdAt: Date;
            status: import(".prisma/client").$Enums.ParticipationStatus;
            eventId: string;
            qrToken: string;
            studentId: string;
        })[];
        role: import(".prisma/client").$Enums.Role;
        id: string;
        tenantId: string | null;
        email: string;
        prn: string | null;
        fullName: string;
        isActive: boolean;
        createdAt: Date;
        collegeId: string | null;
        categoryId: string | null;
        courseId: string | null;
        specializationId: string | null;
        batchId: string | null;
        divisionId: string | null;
    }>;
    update(id: string, updateData: any): Promise<{
        college: {
            name: string;
            id: string;
            tenantId: string;
        } | null;
        course: {
            name: string;
            id: string;
            categoryId: string;
            durationYears: number;
        } | null;
        specialization: {
            name: string;
            id: string;
            courseId: string;
        } | null;
        batch: {
            name: string;
            id: string;
            specializationId: string;
            enrollmentYear: number;
            graduationYear: number;
        } | null;
        division: {
            name: string;
            id: string;
            batchId: string;
        } | null;
        category: {
            name: string;
            id: string;
            collegeId: string;
        } | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        tenantId: string | null;
        email: string;
        prn: string | null;
        fullName: string;
        isActive: boolean;
        createdAt: Date;
        collegeId: string | null;
        categoryId: string | null;
        courseId: string | null;
        specializationId: string | null;
        batchId: string | null;
        divisionId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByRole(tenantId: string, role: Role, page?: number, limit?: number): Promise<{
        data: ({
            college: {
                name: string;
                id: string;
                tenantId: string;
            } | null;
            course: {
                name: string;
                id: string;
                categoryId: string;
                durationYears: number;
            } | null;
            specialization: {
                name: string;
                id: string;
                courseId: string;
            } | null;
            batch: {
                name: string;
                id: string;
                specializationId: string;
                enrollmentYear: number;
                graduationYear: number;
            } | null;
            division: {
                name: string;
                id: string;
                batchId: string;
            } | null;
            category: {
                name: string;
                id: string;
                collegeId: string;
            } | null;
        } & {
            role: import(".prisma/client").$Enums.Role;
            id: string;
            tenantId: string | null;
            email: string;
            prn: string | null;
            passwordHash: string | null;
            fullName: string;
            isActive: boolean;
            createdAt: Date;
            collegeId: string | null;
            categoryId: string | null;
            courseId: string | null;
            specializationId: string | null;
            batchId: string | null;
            divisionId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
