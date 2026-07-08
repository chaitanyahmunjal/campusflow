import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UnitsService } from './units.service';
import { UnitType, Role } from '@prisma/client';

@ApiTags('units')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('units')
export class UnitsController {
  constructor(private unitsService: UnitsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all units for tenant' })
  findAll(
    @CurrentUser() user: any,
    @Query('type') type?: UnitType,
  ) {
    return this.unitsService.findAll(user.tenantId, type);
  }

  @Get('by-handle/:handle')
  @ApiOperation({ summary: 'Get unit by handle' })
  findByHandle(
    @CurrentUser() user: any,
    @Param('handle') handle: string,
  ) {
    return this.unitsService.findByHandle(user.tenantId, handle);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unit by ID' })
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create new unit' })
  create(
    @CurrentUser() user: any,
    @Body() createUnitDto: any,
  ) {
    return this.unitsService.create(user.tenantId, createUnitDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update unit' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.unitsService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete unit' })
  remove(@Param('id') id: string) {
    return this.unitsService.remove(id);
  }

  @Post(':id/faculty/:userId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add faculty to unit' })
  addFaculty(
    @Param('id') unitId: string,
    @Param('userId') userId: string,
  ) {
    return this.unitsService.addFaculty(unitId, userId);
  }

  @Delete(':id/faculty/:userId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remove faculty from unit' })
  removeFaculty(
    @Param('id') unitId: string,
    @Param('userId') userId: string,
  ) {
    return this.unitsService.removeFaculty(unitId, userId);
  }

  @Post(':id/organizer/:userId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Add organizer to unit' })
  addOrganizer(
    @Param('id') unitId: string,
    @Param('userId') userId: string,
  ) {
    return this.unitsService.addOrganizer(unitId, userId);
  }

  @Delete(':id/organizer/:userId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remove organizer from unit' })
  removeOrganizer(
    @Param('id') unitId: string,
    @Param('userId') userId: string,
  ) {
    return this.unitsService.removeOrganizer(unitId, userId);
  }

  @Post(':id/member/:userId')
  @ApiOperation({ summary: 'Add member to unit' })
  addMember(
    @Param('id') unitId: string,
    @Param('userId') userId: string,
  ) {
    return this.unitsService.addMember(unitId, userId);
  }

  @Delete(':id/member/:userId')
  @ApiOperation({ summary: 'Remove member from unit' })
  removeMember(
    @Param('id') unitId: string,
    @Param('userId') userId: string,
  ) {
    return this.unitsService.removeMember(unitId, userId);
  }

  @Get(':id/wallet')
  @ApiOperation({ summary: 'Get unit wallet' })
  getWallet(@Param('id') id: string) {
    return this.unitsService.getWallet(id);
  }

  @Put(':id/wallet/budget')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update unit budget' })
  updateBudget(
    @Param('id') id: string,
    @Body() body: { allocatedBudget: number },
  ) {
    return this.unitsService.updateBudget(id, body.allocatedBudget);
  }

  @Get(':id/wallet/available')
  @ApiOperation({ summary: 'Get available budget' })
  getAvailableBudget(@Param('id') id: string) {
    return this.unitsService.getAvailableBudget(id);
  }
}