import { PrismaService } from '../../prisma/prisma.service';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    log(tenantId: string, userId: string | null, action: string, entityType: string, entityId: string, details?: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entityType: string;
        entityId: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    getLogs(tenantId: string, page?: number, limit?: number, entityType?: string): Promise<{
        data: ({
            user: {
                role: import(".prisma/client").$Enums.Role;
                id: string;
                email: string;
                fullName: string;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            userId: string | null;
            action: string;
            entityType: string;
            entityId: string;
            details: import("@prisma/client/runtime/library").JsonValue | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getEntityLogs(tenantId: string, entityType: string, entityId: string): Promise<({
        user: {
            role: import(".prisma/client").$Enums.Role;
            id: string;
            email: string;
            fullName: string;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        userId: string | null;
        action: string;
        entityType: string;
        entityId: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
}
