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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password, tenantId) {
        const user = await this.prisma.user.findUnique({
            where: {
                tenantId_email: {
                    tenantId,
                    email,
                },
            },
            include: {
                tenant: true,
                college: true,
                category: true,
                course: true,
                specialization: true,
                batch: true,
                division: true,
            },
        });
        if (!user || !user.passwordHash || !user.isActive) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { passwordHash, ...result } = user;
        return result;
    }
    async login(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                tenantId: user.tenantId,
                college: user.college,
                category: user.category,
                course: user.course,
                specialization: user.specialization,
                batch: user.batch,
                division: user.division,
            },
        };
    }
    async register(userData) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                tenantId_email: {
                    tenantId: userData.tenantId,
                    email: userData.email,
                },
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.prisma.user.create({
            data: {
                tenantId: userData.tenantId,
                email: userData.email,
                passwordHash: hashedPassword,
                fullName: userData.fullName,
                role: userData.role || 'STUDENT',
                prn: userData.prn,
                collegeId: userData.collegeId,
                categoryId: userData.categoryId,
                courseId: userData.courseId,
                specializationId: userData.specializationId,
                batchId: userData.batchId,
                divisionId: userData.divisionId,
            },
            include: {
                tenant: true,
                college: true,
                category: true,
                course: true,
                specialization: true,
                batch: true,
                division: true,
            },
        });
        const { passwordHash, ...result } = user;
        return result;
    }
    async validatePreAuthorizedUser(email, tenantId) {
        const preAuthUser = await this.prisma.preAuthorizedUser.findUnique({
            where: {
                tenantId_email: {
                    tenantId,
                    email,
                },
            },
        });
        if (!preAuthUser) {
            throw new common_1.BadRequestException('User not pre-authorized');
        }
        return preAuthUser;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                tenant: true,
                college: true,
                category: true,
                course: true,
                specialization: true,
                batch: true,
                division: true,
                facultyUnits: { include: { unit: true } },
                organizerUnits: { include: { unit: true } },
                memberUnits: { include: { unit: true } },
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const { passwordHash, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map