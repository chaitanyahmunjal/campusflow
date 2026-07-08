import { AuditService } from './audit.service';
export declare class AuditController {
    private auditService;
    constructor(auditService: AuditService);
    getLogs(user: any, page?: number, limit?: number, entityType?: string): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                fullName: string;
                role: import(".prisma/client").$Enums.Role;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            tenantId: string;
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
    getEntityLogs(user: any, entityType: string, entityId: string): Promise<({
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.Role;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        tenantId: string;
        userId: string | null;
        action: string;
        entityType: string;
        entityId: string;
        details: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
}
