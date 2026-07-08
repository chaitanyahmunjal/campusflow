import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
export interface AuthPayload {
    sub: string;
    email: string;
    role: string;
    tenantId?: string;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string, tenantId: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
            tenantId: any;
            college: any;
            category: any;
            course: any;
            specialization: any;
            batch: any;
            division: any;
        };
    }>;
    register(userData: any): Promise<{
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
    validatePreAuthorizedUser(email: string, tenantId: string): Promise<{
        id: string;
        email: string;
        prn: string | null;
        role: import(".prisma/client").$Enums.Role;
        tenantId: string;
        collegeId: string | null;
        categoryId: string | null;
        courseId: string | null;
        specializationId: string | null;
        batchId: string | null;
        divisionId: string | null;
    }>;
    getProfile(userId: string): Promise<{
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
}
