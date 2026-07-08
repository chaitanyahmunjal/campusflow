import { UnitsService } from './units.service';
import { UnitType } from '@prisma/client';
export declare class UnitsController {
    private unitsService;
    constructor(unitsService: UnitsService);
    findAll(user: any, type?: UnitType): Promise<({
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
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
        _count: {
            events: number;
        };
    } & {
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
    })[]>;
    findByHandle(user: any, handle: string): Promise<{
        faculties: ({
            user: {
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
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        organizers: ({
            user: {
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
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        members: ({
            user: {
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
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        events: {
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
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
    } & {
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
    }>;
    findOne(id: string): Promise<{
        faculties: ({
            user: {
                id: string;
                email: string;
                fullName: string;
                role: import(".prisma/client").$Enums.Role;
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
                role: import(".prisma/client").$Enums.Role;
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
                role: import(".prisma/client").$Enums.Role;
            };
        } & {
            unitId: string;
            userId: string;
        })[];
        events: {
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
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
    } & {
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
    }>;
    create(user: any, createUnitDto: any): Promise<{
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
    }>;
    update(id: string, updateData: any): Promise<{
        wallet: {
            unitId: string;
            allocatedBudget: number;
            spentBudget: number;
            lockedBudget: number;
        } | null;
    } & {
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
    getWallet(id: string): Promise<{
        unitId: string;
        allocatedBudget: number;
        spentBudget: number;
        lockedBudget: number;
    }>;
    updateBudget(id: string, body: {
        allocatedBudget: number;
    }): Promise<{
        unitId: string;
        allocatedBudget: number;
        spentBudget: number;
        lockedBudget: number;
    }>;
    getAvailableBudget(id: string): Promise<{
        allocated: number;
        spent: number;
        locked: number;
        available: number;
    }>;
}
