import { PrismaService } from '../../prisma/prisma.service';
import { UnitType } from '@prisma/client';
export declare class UnitsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, type?: UnitType): Promise<({
        _count: {
            events: number;
        };
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
        faculties: ({
            user: {
                id: string;
                email: string;
                fullName: string;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        organizers: ({
            user: {
                id: string;
                email: string;
                fullName: string;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        members: ({
            user: {
                id: string;
                email: string;
                fullName: string;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
        faculties: ({
            user: {
                role: import(".prisma/client").$Enums.Role;
                id: string;
                email: string;
                fullName: string;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        organizers: ({
            user: {
                role: import(".prisma/client").$Enums.Role;
                id: string;
                email: string;
                fullName: string;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        members: ({
            user: {
                role: import(".prisma/client").$Enums.Role;
                id: string;
                email: string;
                fullName: string;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        events: {
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
    } & {
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
    }>;
    findByHandle(tenantId: string, handle: string): Promise<{
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
        faculties: ({
            user: {
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
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        organizers: ({
            user: {
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
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        members: ({
            user: {
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
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        events: {
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
    } & {
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
    }>;
    create(tenantId: string, unitData: any): Promise<{
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
    }>;
    update(id: string, updateData: any): Promise<{
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
    } & {
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    addFaculty(unitId: string, userId: string): Promise<{
        unitId: string;
        userId: string;
    }>;
    removeFaculty(unitId: string, userId: string): Promise<{
        message: string;
    }>;
    addOrganizer(unitId: string, userId: string): Promise<{
        unitId: string;
        userId: string;
    }>;
    removeOrganizer(unitId: string, userId: string): Promise<{
        message: string;
    }>;
    addMember(unitId: string, userId: string): Promise<{
        unitId: string;
        userId: string;
    }>;
    removeMember(unitId: string, userId: string): Promise<{
        message: string;
    }>;
    getWallet(unitId: string): Promise<{
        unitId: string;
        allocatedBudget: number;
        spentBudget: number;
        lockedBudget: number;
    }>;
    updateBudget(unitId: string, allocatedBudget: number): Promise<{
        unitId: string;
        allocatedBudget: number;
        spentBudget: number;
        lockedBudget: number;
    }>;
    getAvailableBudget(unitId: string): Promise<{
        allocated: number;
        spent: number;
        locked: number;
        available: number;
    }>;
}
