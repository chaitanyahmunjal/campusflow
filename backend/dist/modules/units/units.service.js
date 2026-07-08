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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UnitsService = class UnitsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, type) {
        const where = { tenantId };
        if (type) {
            where.type = type;
        }
        return this.prisma.unit.findMany({
            where,
            include: {
                wallet: true,
                faculties: { include: { user: { select: { id: true, fullName: true, email: true } } } },
                organizers: { include: { user: { select: { id: true, fullName: true, email: true } } } },
                members: { include: { user: { select: { id: true, fullName: true, email: true } } } },
                _count: {
                    select: {
                        events: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const unit = await this.prisma.unit.findUnique({
            where: { id },
            include: {
                wallet: true,
                faculties: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                                role: true,
                            },
                        },
                    },
                },
                organizers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                                role: true,
                            },
                        },
                    },
                },
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                                role: true,
                            },
                        },
                    },
                },
                events: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
        if (!unit) {
            throw new common_1.NotFoundException('Unit not found');
        }
        return unit;
    }
    async findByHandle(tenantId, handle) {
        const unit = await this.prisma.unit.findUnique({
            where: {
                tenantId_handle: {
                    tenantId,
                    handle,
                },
            },
            include: {
                wallet: true,
                faculties: { include: { user: true } },
                organizers: { include: { user: true } },
                members: { include: { user: true } },
                events: {
                    where: { status: 'PUBLISHED' },
                    orderBy: { date: 'desc' },
                },
            },
        });
        if (!unit) {
            throw new common_1.NotFoundException('Unit not found');
        }
        return unit;
    }
    async create(tenantId, unitData) {
        const existingUnit = await this.prisma.unit.findUnique({
            where: {
                tenantId_handle: {
                    tenantId,
                    handle: unitData.handle,
                },
            },
        });
        if (existingUnit) {
            throw new common_1.ConflictException('Unit with this handle already exists');
        }
        return this.prisma.$transaction(async (tx) => {
            const unit = await tx.unit.create({
                data: {
                    ...unitData,
                    tenantId,
                },
            });
            await tx.unitWallet.create({
                data: {
                    unitId: unit.id,
                    allocatedBudget: unitData.initialBudget || 0,
                },
            });
            return unit;
        });
    }
    async update(id, updateData) {
        if (updateData.handle) {
            const existingUnit = await this.prisma.unit.findUnique({
                where: { id },
            });
            if (existingUnit && existingUnit.handle !== updateData.handle) {
                const unitWithNewHandle = await this.prisma.unit.findUnique({
                    where: {
                        tenantId_handle: {
                            tenantId: existingUnit.tenantId,
                            handle: updateData.handle,
                        },
                    },
                });
                if (unitWithNewHandle) {
                    throw new common_1.ConflictException('Unit with this handle already exists');
                }
            }
        }
        return this.prisma.unit.update({
            where: { id },
            data: updateData,
            include: { wallet: true },
        });
    }
    async remove(id) {
        await this.prisma.unit.delete({
            where: { id },
        });
        return { message: 'Unit deleted successfully' };
    }
    async addFaculty(unitId, userId) {
        const existing = await this.prisma.unitFaculty.findUnique({
            where: {
                unitId_userId: {
                    unitId,
                    userId,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('User is already a faculty of this unit');
        }
        return this.prisma.unitFaculty.create({
            data: { unitId, userId },
        });
    }
    async removeFaculty(unitId, userId) {
        await this.prisma.unitFaculty.delete({
            where: {
                unitId_userId: {
                    unitId,
                    userId,
                },
            },
        });
        return { message: 'Faculty removed successfully' };
    }
    async addOrganizer(unitId, userId) {
        const existing = await this.prisma.unitOrganizer.findUnique({
            where: {
                unitId_userId: {
                    unitId,
                    userId,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('User is already an organizer of this unit');
        }
        return this.prisma.unitOrganizer.create({
            data: { unitId, userId },
        });
    }
    async removeOrganizer(unitId, userId) {
        await this.prisma.unitOrganizer.delete({
            where: {
                unitId_userId: {
                    unitId,
                    userId,
                },
            },
        });
        return { message: 'Organizer removed successfully' };
    }
    async addMember(unitId, userId) {
        const existing = await this.prisma.unitMember.findUnique({
            where: {
                unitId_userId: {
                    unitId,
                    userId,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('User is already a member of this unit');
        }
        return this.prisma.unitMember.create({
            data: { unitId, userId },
        });
    }
    async removeMember(unitId, userId) {
        await this.prisma.unitMember.delete({
            where: {
                unitId_userId: {
                    unitId,
                    userId,
                },
            },
        });
        return { message: 'Member removed successfully' };
    }
    async getWallet(unitId) {
        const wallet = await this.prisma.unitWallet.findUnique({
            where: { unitId },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Wallet not found');
        }
        return wallet;
    }
    async updateBudget(unitId, allocatedBudget) {
        return this.prisma.unitWallet.upsert({
            where: { unitId },
            update: { allocatedBudget },
            create: {
                unitId,
                allocatedBudget,
                spentBudget: 0,
                lockedBudget: 0,
            },
        });
    }
    async getAvailableBudget(unitId) {
        const wallet = await this.prisma.unitWallet.findUnique({
            where: { unitId },
        });
        if (!wallet) {
            throw new common_1.NotFoundException('Wallet not found');
        }
        const available = wallet.allocatedBudget - (wallet.spentBudget + wallet.lockedBudget);
        return {
            allocated: wallet.allocatedBudget,
            spent: wallet.spentBudget,
            locked: wallet.lockedBudget,
            available,
        };
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitsService);
//# sourceMappingURL=units.service.js.map