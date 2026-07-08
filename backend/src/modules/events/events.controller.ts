import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { EventsService } from './events.service';
import { EventStatus, Role } from '@prisma/client';

@ApiTags('events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events for tenant' })
  findAll(
    @CurrentUser() user: any,
    @Query('status') status?: EventStatus,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.eventsService.findAll(user.tenantId, status, +page, +limit);
  }

  @Get('pending-approval')
  @Roles(Role.ADMIN, Role.FACULTY)
  @ApiOperation({ summary: 'Get events pending approval' })
  getPendingApproval(@CurrentUser() user: any) {
    return this.eventsService.getEventsPendingApproval(user.tenantId);
  }

  @Get('student/eligible')
  @ApiOperation({ summary: 'Get eligible events for student' })
  getEligibleEvents(@CurrentUser() user: any) {
    return this.eventsService.getEligibleEventsForStudent(user.sub, user.tenantId);
  }

  @Get('organizer/my-events')
  @ApiOperation({ summary: 'Get events for organizer' })
  getMyEvents(@CurrentUser() user: any, @Query('unitId') unitId: string) {
    return this.eventsService.getEventsForOrganizer(unitId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Get(':unitHandle/:slug')
  @ApiOperation({ summary: 'Get event by unit handle and slug' })
  findBySlug(
    @CurrentUser() user: any,
    @Param('unitHandle') unitHandle: string,
    @Param('slug') slug: string,
  ) {
    return this.eventsService.findBySlug(user.tenantId, unitHandle, slug);
  }

  @Post(':unitId')
  @ApiOperation({ summary: 'Create new event' })
  create(
    @CurrentUser() user: any,
    @Param('unitId') unitId: string,
    @Body() eventData: any,
  ) {
    return this.eventsService.create(user.sub, unitId, eventData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update event' })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    return this.eventsService.update(id, user.sub, updateData);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit event for approval' })
  submitForApproval(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.eventsService.submitForApproval(id, user.sub);
  }

  @Post(':id/approve')
  @Roles(Role.ADMIN, Role.FACULTY)
  @ApiOperation({ summary: 'Approve event' })
  approveEvent(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { comments?: string },
  ) {
    return this.eventsService.approveEvent(id, user.sub, body.comments);
  }

  @Post(':id/reject')
  @Roles(Role.ADMIN, Role.FACULTY)
  @ApiOperation({ summary: 'Reject event' })
  rejectEvent(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { comments: string },
  ) {
    return this.eventsService.rejectEvent(id, user.sub, body.comments);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish approved event' })
  publishEvent(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.eventsService.publishEvent(id, user.sub);
  }
}