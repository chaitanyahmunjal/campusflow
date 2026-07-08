import { UsersService } from './users.service';
import { Role } from '@prisma/client';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(user: any, page?: number, limit?: number, search?: string): Promise<{
        data: ({
            college: {
                id: string;
                tenantId: string;
                name: string;
            } | null;
            category: {
                id: string;
                collegeId: string;
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
            division: {
                id: string;
                batchId: string;
                name: string;
            } | null;
        } & {
            id: string;
            email: string;
            prn: string | null;
            passwordHash: string | null;
            fullName: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            createdAt: Date;
            tenantId: string | null;
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
    findByRole(user: any, role: Role, page?: number, limit?: number): Promise<{
        data: ({
            college: {
                id: string;
                tenantId: string;
                name: string;
            } | null;
            category: {
                id: string;
                collegeId: string;
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
            division: {
                id: string;
                batchId: string;
                name: string;
            } | null;
        } & {
            id: string;
            email: string;
            prn: string | null;
            passwordHash: string | null;
            fullName: string;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
            createdAt: Date;
            tenantId: string | null;
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
            id: string;
            createdAt: Date;
            name: string;
            domain: string;
            allowAlumniAccess: boolean;
            updatedAt: Date;
        } | null;
        college: {
            id: string;
            tenantId: string;
            name: string;
        } | null;
        category: {
            id: string;
            collegeId: string;
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
        division: {
            id: string;
            batchId: string;
            name: string;
        } | null;
        facultyUnits: ({
            unit: {
                id: string;
                createdAt: Date;
                tenantId: string;
                name: string;
                updatedAt: Date;
                handle: string;
                type: import(".prisma/client").$Enums.UnitType;
                tagline: string | null;
                description: string | null;
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
                id: string;
                createdAt: Date;
                tenantId: string;
                name: string;
                updatedAt: Date;
                handle: string;
                type: import(".prisma/client").$Enums.UnitType;
                tagline: string | null;
                description: string | null;
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
                id: string;
                createdAt: Date;
                tenantId: string;
                name: string;
                updatedAt: Date;
                handle: string;
                type: import(".prisma/client").$Enums.UnitType;
                tagline: string | null;
                description: string | null;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            unitId: string;
            description: string;
            status: import(".prisma/client").$Enums.EventStatus;
            createdByUserId: string;
            title: string;
            budgetAmount: number;
            date: Date | null;
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                unitId: string;
                description: string;
                status: import(".prisma/client").$Enums.EventStatus;
                createdByUserId: string;
                title: string;
                budgetAmount: number;
                date: Date | null;
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
            qrToken: string;
            eventId: string;
            studentId: string;
        })[];
        id: string;
        email: string;
        prn: string | null;
        fullName: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        createdAt: Date;
        tenantId: string | null;
        collegeId: string | null;
        categoryId: string | null;
        courseId: string | null;
        specializationId: string | null;
        batchId: string | null;
        divisionId: string | null;
    }>;
    update(id: string, updateData: any): Promise<{
        college: {
            id: string;
            tenantId: string;
            name: string;
        } | null;
        category: {
            id: string;
            collegeId: string;
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
        division: {
            id: string;
            batchId: string;
            name: string;
        } | null;
        id: string;
        email: string;
        prn: string | null;
        fullName: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        createdAt: Date;
        tenantId: string | null;
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
}
