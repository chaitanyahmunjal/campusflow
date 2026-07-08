import { TenantsService } from './tenants.service';
export declare class TenantsController {
    private tenantsService;
    constructor(tenantsService: TenantsService);
    findAll(): Promise<({
        _count: {
            users: number;
            units: number;
            colleges: number;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        users: ({
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
        units: ({
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
        })[];
        colleges: ({
            _count: {
                users: number;
                categories: number;
            };
        } & {
            id: string;
            tenantId: string;
            name: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    }>;
    create(createTenantDto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    }>;
    update(id: string, updateData: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        domain: string;
        allowAlumniAccess: boolean;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getColleges(id: string): Promise<({
        categories: ({
            courses: ({
                specializations: ({
                    batches: ({
                        divisions: {
                            id: string;
                            batchId: string;
                            name: string;
                        }[];
                    } & {
                        id: string;
                        specializationId: string;
                        name: string;
                        enrollmentYear: number;
                        graduationYear: number;
                    })[];
                } & {
                    id: string;
                    courseId: string;
                    name: string;
                })[];
            } & {
                id: string;
                categoryId: string;
                name: string;
                durationYears: number;
            })[];
        } & {
            id: string;
            collegeId: string;
            name: string;
        })[];
    } & {
        id: string;
        tenantId: string;
        name: string;
    })[]>;
    createCollege(id: string, collegeData: any): Promise<{
        id: string;
        tenantId: string;
        name: string;
    }>;
    createCategory(collegeId: string, categoryData: any): Promise<{
        id: string;
        collegeId: string;
        name: string;
    }>;
    createCourse(categoryId: string, courseData: any): Promise<{
        id: string;
        categoryId: string;
        name: string;
        durationYears: number;
    }>;
    createSpecialization(courseId: string, specData: any): Promise<{
        id: string;
        courseId: string;
        name: string;
    }>;
    createBatch(specId: string, batchData: any): Promise<{
        id: string;
        specializationId: string;
        name: string;
        enrollmentYear: number;
        graduationYear: number;
    }>;
    createDivision(batchId: string, divisionData: any): Promise<{
        id: string;
        batchId: string;
        name: string;
    }>;
}
