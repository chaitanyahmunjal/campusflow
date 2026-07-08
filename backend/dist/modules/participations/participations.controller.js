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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../decorators/current-user.decorator");
const participations_service_1 = require("./participations.service");
const client_1 = require("@prisma/client");
let ParticipationsController = class ParticipationsController {
    constructor(participationsService) {
        this.participationsService = participationsService;
    }
    registerForEvent(user, eventId) {
        return this.participationsService.registerForEvent(eventId, user.sub);
    }
    getMyRegistrations(user) {
        return this.participationsService.getStudentRegistrations(user.sub);
    }
    getParticipation(eventId, studentId) {
        return this.participationsService.getParticipation(eventId, studentId);
    }
    cancelRegistration(user, eventId) {
        return this.participationsService.cancelRegistration(eventId, user.sub);
    }
    scanAndCheckIn(user, body) {
        return this.participationsService.scanAndCheckIn(body.qrToken, body.eventId);
    }
    getAttendees(eventId) {
        return this.participationsService.getEventAttendees(eventId);
    }
    getStats(eventId) {
        return this.participationsService.getAttendanceStats(eventId);
    }
};
exports.ParticipationsController = ParticipationsController;
__decorate([
    (0, common_1.Post)('register/:eventId'),
    (0, swagger_1.ApiOperation)({ summary: 'Register for event' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "registerForEvent", null);
__decorate([
    (0, common_1.Get)('my-registrations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student registrations' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "getMyRegistrations", null);
__decorate([
    (0, common_1.Get)(':eventId/:studentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get participation details with QR code' }),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "getParticipation", null);
__decorate([
    (0, common_1.Post)(':eventId/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel registration' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "cancelRegistration", null);
__decorate([
    (0, common_1.Post)('scan'),
    (0, roles_decorator_1.Roles)(client_1.Role.ORGANIZER, client_1.Role.FACULTY, client_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Scan QR code and check-in' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "scanAndCheckIn", null);
__decorate([
    (0, common_1.Get)('event/:eventId/attendees'),
    (0, swagger_1.ApiOperation)({ summary: 'Get event attendees' }),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "getAttendees", null);
__decorate([
    (0, common_1.Get)('event/:eventId/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance statistics' }),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "getStats", null);
exports.ParticipationsController = ParticipationsController = __decorate([
    (0, swagger_1.ApiTags)('participations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('participations'),
    __metadata("design:paramtypes", [participations_service_1.ParticipationsService])
], ParticipationsController);
//# sourceMappingURL=participations.controller.js.map