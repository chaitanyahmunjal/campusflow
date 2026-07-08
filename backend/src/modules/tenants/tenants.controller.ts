import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { TenantsService } from './tenants.service';
import { Role } from '@prisma/client';

@ApiTags('tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all tenants' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get tenant by ID' })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create new tenant' })
  create(@Body() createTenantDto: any) {
    return this.tenantsService.create(createTenantDto);
  }

  @Put(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update tenant' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.tenantsService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete tenant' })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }

  @Get(':id/colleges')
  @ApiOperation({ summary: 'Get colleges for tenant' })
  getColleges(@Param('id') id: string) {
    return this.tenantsService.getColleges(id);
  }

  @Post(':id/colleges')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create college' })
  createCollege(@Param('id') id: string, @Body() collegeData: any) {
    return this.tenantsService.createCollege(id, collegeData);
  }

  @Post('colleges/:collegeId/categories')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create program category' })
  createCategory(@Param('collegeId') collegeId: string, @Body() categoryData: any) {
    return this.tenantsService.createCategory(collegeId, categoryData);
  }

  @Post('categories/:categoryId/courses')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create course' })
  createCourse(@Param('categoryId') categoryId: string, @Body() courseData: any) {
    return this.tenantsService.createCourse(categoryId, courseData);
  }

  @Post('courses/:courseId/specializations')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create specialization' })
  createSpecialization(@Param('courseId') courseId: string, @Body() specData: any) {
    return this.tenantsService.createSpecialization(courseId, specData);
  }

  @Post('specializations/:specializationId/batches')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create batch' })
  createBatch(@Param('specializationId') specId: string, @Body() batchData: any) {
    return this.tenantsService.createBatch(specId, batchData);
  }

  @Post('batches/:batchId/divisions')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create division' })
  createDivision(@Param('batchId') batchId: string, @Body() divisionData: any) {
    return this.tenantsService.createDivision(batchId, divisionData);
  }
}