import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { ParticipationsService } from './participations.service';
import { Role } from '@prisma/client';

@ApiTags('participations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('participations')
export class ParticipationsController {
  constructor(private participationsService: ParticipationsService) {}

  @Post('register/:eventId')
  @ApiOperation({ summary: 'Register for event' })
  registerForEvent(
    @CurrentUser() user: any,
    @Param('eventId') eventId: string,
  ) {
    return this.participationsService.registerForEvent(eventId, user.sub);
  }

  @Get('my-registrations')
  @ApiOperation({ summary: 'Get student registrations' })
  getMyRegistrations(@CurrentUser() user: any) {
    return this.participationsService.getStudentRegistrations(user.sub);
  }

  @Get(':eventId/:studentId')
  @ApiOperation({ summary: 'Get participation details with QR code' })
  getParticipation(
    @Param('eventId') eventId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.participationsService.getParticipation(eventId, studentId);
  }

  @Post(':eventId/cancel')
  @ApiOperation({ summary: 'Cancel registration' })
  cancelRegistration(
    @CurrentUser() user: any,
    @Param('eventId') eventId: string,
  ) {
    return this.participationsService.cancelRegistration(eventId, user.sub);
  }

  @Post('scan')
  @Roles(Role.ORGANIZER, Role.FACULTY, Role.ADMIN)
  @ApiOperation({ summary: 'Scan QR code and check-in' })
  scanAndCheckIn(
    @CurrentUser() user: any,
    @Body() body: { qrToken: string; eventId: string },
  ) {
    return this.participationsService.scanAndCheckIn(body.qrToken, body.eventId);
  }

  @Get('event/:eventId/attendees')
  @ApiOperation({ summary: 'Get event attendees' })
  getAttendees(@Param('eventId') eventId: string) {
    return this.participationsService.getEventAttendees(eventId);
  }

  @Get('event/:eventId/stats')
  @ApiOperation({ summary: 'Get attendance statistics' })
  getStats(@Param('eventId') eventId: string) {
    return this.participationsService.getAttendanceStats(eventId);
  }
}