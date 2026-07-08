import { PrismaService } from '../../prisma/prisma.service';
export declare class TenantsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        _count: {
            users: number;
            units: number;
            colleges: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        users: ({
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
        units: ({
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
        })[];
        colleges: ({
            _count: {
                categories: number;
                users: number;
            };
        } & {
            name: string;
            id: string;
            tenantId: string;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    }>;
    create(createTenantDto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    }>;
    update(id: string, updateData: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getColleges(tenantId: string): Promise<({
        categories: ({
            courses: ({
                specializations: ({
                    batches: ({
                        divisions: {
                            name: string;
                            id: string;
                            batchId: string;
                        }[];
                    } & {
                        name: string;
                        id: string;
                        specializationId: string;
                        enrollmentYear: number;
                        graduationYear: number;
                    })[];
                } & {
                    name: string;
                    id: string;
                    courseId: string;
                })[];
            } & {
                name: string;
                id: string;
                categoryId: string;
                durationYears: number;
            })[];
        } & {
            name: string;
            id: string;
            collegeId: string;
        })[];
    } & {
        name: string;
        id: string;
        tenantId: string;
    })[]>;
    createCollege(tenantId: string, collegeData: any): Promise<{
        name: string;
        id: string;
        tenantId: string;
    }>;
    createCategory(collegeId: string, categoryData: any): Promise<{
        name: string;
        id: string;
        collegeId: string;
    }>;
    createCourse(categoryId: string, courseData: any): Promise<{
        name: string;
        id: string;
        categoryId: string;
        durationYears: number;
    }>;
    createSpecialization(courseId: string, specializationData: any): Promise<{
        name: string;
        id: string;
        courseId: string;
    }>;
    createBatch(specializationId: string, batchData: any): Promise<{
        name: string;
        id: string;
        specializationId: string;
        enrollmentYear: number;
        graduationYear: number;
    }>;
    createDivision(batchId: string, divisionData: any): Promise<{
        name: string;
        id: string;
        batchId: string;
    }>;
}
