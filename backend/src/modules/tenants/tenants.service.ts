import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

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

  async findOne(id: string) {
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
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async create(createTenantDto: any) {
    const existingTenant = await this.prisma.tenant.findUnique({
      where: { domain: createTenantDto.domain },
    });

    if (existingTenant) {
      throw new ConflictException('Tenant with this domain already exists');
    }

    return this.prisma.tenant.create({
      data: createTenantDto,
    });
  }

  async update(id: string, updateData: any) {
    return this.prisma.tenant.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    await this.prisma.tenant.delete({
      where: { id },
    });

    return { message: 'Tenant deleted successfully' };
  }

  async getColleges(tenantId: string) {
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

  async createCollege(tenantId: string, collegeData: any) {
    const existingCollege = await this.prisma.college.findFirst({
      where: {
        tenantId,
        name: collegeData.name,
      },
    });

    if (existingCollege) {
      throw new ConflictException('College with this name already exists');
    }

    return this.prisma.college.create({
      data: {
        ...collegeData,
        tenantId,
      },
    });
  }

  async createCategory(collegeId: string, categoryData: any) {
    const college = await this.prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      throw new NotFoundException('College not found');
    }

    const existingCategory = await this.prisma.programCategory.findFirst({
      where: {
        collegeId,
        name: categoryData.name,
      },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    return this.prisma.programCategory.create({
      data: {
        ...categoryData,
        collegeId,
      },
    });
  }

  async createCourse(categoryId: string, courseData: any) {
    return this.prisma.course.create({
      data: {
        ...courseData,
        categoryId,
      },
    });
  }

  async createSpecialization(courseId: string, specializationData: any) {
    const existingSpec = await this.prisma.specialization.findFirst({
      where: {
        courseId,
        name: specializationData.name,
      },
    });

    if (existingSpec) {
      throw new ConflictException('Specialization with this name already exists');
    }

    return this.prisma.specialization.create({
      data: {
        ...specializationData,
        courseId,
      },
    });
  }

  async createBatch(specializationId: string, batchData: any) {
    const existingBatch = await this.prisma.batch.findFirst({
      where: {
        specializationId,
        name: batchData.name,
      },
    });

    if (existingBatch) {
      throw new ConflictException('Batch with this name already exists');
    }

    return this.prisma.batch.create({
      data: {
        ...batchData,
        specializationId,
      },
    });
  }

  async createDivision(batchId: string, divisionData: any) {
    const existingDivision = await this.prisma.division.findFirst({
      where: {
        batchId,
        name: divisionData.name,
      },
    });

    if (existingDivision) {
      throw new ConflictException('Division with this name already exists');
    }

    return this.prisma.division.create({
      data: {
        ...divisionData,
        batchId,
      },
    });
  }
}