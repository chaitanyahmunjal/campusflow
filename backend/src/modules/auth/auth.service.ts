import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export interface AuthPayload {
  sub: string;
  email: string;
  role: string;
  tenantId?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string, tenantId: string): Promise<any> {
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
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload: AuthPayload = {
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

  async register(userData: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        tenantId_email: {
          tenantId: userData.tenantId,
          email: userData.email,
        },
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
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

  async validatePreAuthorizedUser(email: string, tenantId: string) {
    const preAuthUser = await this.prisma.preAuthorizedUser.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email,
        },
      },
    });

    if (!preAuthUser) {
      throw new BadRequestException('User not pre-authorized');
    }

    return preAuthUser;
  }

  async getProfile(userId: string) {
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
      throw new UnauthorizedException('User not found');
    }

    const { passwordHash, ...result } = user;
    return result;
  }
}