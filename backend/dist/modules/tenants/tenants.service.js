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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TenantsService = class TenantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.tenant.findMany({
            include: {
                _count: {
                    select: {
                        users: true,
                        units: true,
                        colleges: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const tenant = await this.prisma.tenant.findUnique({
            where: { id },
            include: {
                users: {
                    include: {
                        college: true,
                        category: true,
                        course: true,
                    },
                    take: 10,
                },
                units: {
                    include: {
                        wallet: true,
                    },
                    take: 10,
                },
                colleges: {
                    include: {
                        _count: {
                            select: {
                                categories: true,
                                users: true,
                            },
                        },
                    },
                },
            },
        });
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found');
        }
        return tenant;
    }
    async create(createTenantDto) {
        const existingTenant = await this.prisma.tenant.findUnique({
            where: { domain: createTenantDto.domain },
        });
        if (existingTenant) {
            throw new common_1.ConflictException('Tenant with this domain already exists');
        }
        return this.prisma.tenant.create({
            data: createTenantDto,
        });
    }
    async update(id, updateData) {
        return this.prisma.tenant.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        await this.prisma.tenant.delete({
            where: { id },
        });
        return { message: 'Tenant deleted successfully' };
    }
    async getColleges(tenantId) {
        return this.prisma.college.findMany({
            where: { tenantId },
            include: {
                categories: {
                    include: {
                        courses: {
                            include: {
                                specializations: {
                                    include: {
                                        batches: {
                                            include: {
                                                divisions: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    async createCollege(tenantId, collegeData) {
        const existingCollege = await this.prisma.college.findFirst({
            where: {
                tenantId,
                name: collegeData.name,
            },
        });
        if (existingCollege) {
            throw new common_1.ConflictException('College with this name already exists');
        }
        return this.prisma.college.create({
            data: {
                ...collegeData,
                tenantId,
            },
        });
    }
    async createCategory(collegeId, categoryData) {
        const college = await this.prisma.college.findUnique({
            where: { id: collegeId },
        });
        if (!college) {
            throw new common_1.NotFoundException('College not found');
        }
        const existingCategory = await this.prisma.programCategory.findFirst({
            where: {
                collegeId,
                name: categoryData.name,
            },
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category with this name already exists');
        }
        return this.prisma.programCategory.create({
            data: {
                ...categoryData,
                collegeId,
            },
        });
    }
    async createCourse(categoryId, courseData) {
        return this.prisma.course.create({
            data: {
                ...courseData,
                categoryId,
            },
        });
    }
    async createSpecialization(courseId, specializationData) {
        const existingSpec = await this.prisma.specialization.findFirst({
            where: {
                courseId,
                name: specializationData.name,
            },
        });
        if (existingSpec) {
            throw new common_1.ConflictException('Specialization with this name already exists');
        }
        return this.prisma.specialization.create({
            data: {
                ...specializationData,
                courseId,
            },
        });
    }
    async createBatch(specializationId, batchData) {
        const existingBatch = await this.prisma.batch.findFirst({
            where: {
                specializationId,
                name: batchData.name,
            },
        });
        if (existingBatch) {
            throw new common_1.ConflictException('Batch with this name already exists');
        }
        return this.prisma.batch.create({
            data: {
                ...batchData,
                specializationId,
            },
        });
    }
    async createDivision(batchId, divisionData) {
        const existingDivision = await this.prisma.division.findFirst({
            where: {
                batchId,
                name: divisionData.name,
            },
        });
        if (existingDivision) {
            throw new common_1.ConflictException('Division with this name already exists');
        }
        return this.prisma.division.create({
            data: {
                ...divisionData,
                batchId,
            },
        });
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map