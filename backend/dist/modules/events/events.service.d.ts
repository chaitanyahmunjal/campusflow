import { PrismaService } from '../../prisma/prisma.service';
import { EventStatus } from '@prisma/client';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, status?: EventStatus, page?: number, limit?: number): Promise<{
        data: ({
            unit: {
                wallet: {
                    unitId: string;
                    allocatedBudget: number;
                    spentBudget: number;
                    lockedBudget: number;
                } | null;
            } & {
                id: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                tenantId: string;
                name: string;
                handle: string;
                type: import(".prisma/client").$Enums.UnitType;
                tagline: string | null;
                about: string | null;
                logoUrl: string | null;
                coverUrl: string | null;
                websiteUrl: string | null;
                socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
            };
            createdBy: {
                id: string;
                email: string;
                fullName: string;
            };
            constraint: ({
                targetColleges: ({
                    college: {
                        id: string;
                        tenantId: string;
                        name: string;
                    };
                } & {
                    collegeId: string;
                    eventId: string;
                })[];
                targetCategories: ({
                    category: {
                        id: string;
                        collegeId: string;
                        name: string;
                    };
                } & {
                    categoryId: string;
                    eventId: string;
                })[];
                targetCourses: ({
                    course: {
                        id: string;
                        categoryId: string;
                        name: string;
                        durationYears: number;
                    };
                } & {
                    courseId: string;
                    eventId: string;
                })[];
                targetSpecializations: ({
                    specialization: {
                        id: string;
                        courseId: string;
                        name: string;
                    };
                } & {
                    specializationId: string;
                    eventId: string;
                })[];
                targetBatches: ({
                    batch: {
                        id: string;
                        specializationId: string;
                        name: string;
                        enrollmentYear: number;
                        graduationYear: number;
                    };
                } & {
                    batchId: string;
                    eventId: string;
                })[];
                targetDivisions: ({
                    division: {
                        id: string;
                        batchId: string;
                        name: string;
                    };
                } & {
                    divisionId: string;
                    eventId: string;
                })[];
            } & {
                eventId: string;
            }) | null;
            _count: {
                attendees: number;
            };
        } & {
            id: string;
            unitId: string;
            createdByUserId: string;
            title: string;
            description: string;
            budgetAmount: number;
            status: import(".prisma/client").$Enums.EventStatus;
            date: Date | null;
            location: string | null;
            ticketTemplate: string;
            ticketBackgroundUrl: string | null;
            coverImageUrl: string | null;
            highlights: import("@prisma/client/runtime/library").JsonValue | null;
            schedule: import("@prisma/client/runtime/library").JsonValue | null;
            speakers: import("@prisma/client/runtime/library").JsonValue | null;
            rules: import("@prisma/client/runtime/library").JsonValue | null;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
            faculties: ({
                user: {
                    id: string;
                    createdAt: Date;
                    tenantId: string | null;
                    email: string;
                    prn: string | null;
                    passwordHash: string | null;
                    fullName: string;
                    role: import(".prisma/client").$Enums.Role;
                    isActive: boolean;
                    collegeId: string | null;
                    categoryId: string | null;
                    courseId: string | null;
                    specializationId: string | null;
                    batchId: string | null;
                    divisionId: string | null;
                };
            } & {
                unitId: string;
                userId: string;
            })[];
            organizers: ({
                user: {
                    id: string;
                    createdAt: Date;
                    tenantId: string | null;
                    email: string;
                    prn: string | null;
                    passwordHash: string | null;
                    fullName: string;
                    role: import(".prisma/client").$Enums.Role;
                    isActive: boolean;
                    collegeId: string | null;
                    categoryId: string | null;
                    courseId: string | null;
                    specializationId: string | null;
                    batchId: string | null;
                    divisionId: string | null;
                };
            } & {
                unitId: string;
                userId: string;
            })[];
        } & {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            about: string | null;
            logoUrl: string | null;
            coverUrl: string | null;
            websiteUrl: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        };
        createdBy: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.Role;
        };
        constraint: ({
            targetColleges: ({
                college: {
                    id: string;
                    tenantId: string;
                    name: string;
                };
            } & {
                collegeId: string;
                eventId: string;
            })[];
            targetCategories: ({
                category: {
                    id: string;
                    collegeId: string;
                    name: string;
                };
            } & {
                categoryId: string;
                eventId: string;
            })[];
            targetCourses: ({
                course: {
                    id: string;
                    categoryId: string;
                    name: string;
                    durationYears: number;
                };
            } & {
                courseId: string;
                eventId: string;
            })[];
            targetSpecializations: ({
                specialization: {
                    id: string;
                    courseId: string;
                    name: string;
                };
            } & {
                specializationId: string;
                eventId: string;
            })[];
            targetBatches: ({
                batch: {
                    id: string;
                    specializationId: string;
                    name: string;
                    enrollmentYear: number;
                    graduationYear: number;
                };
            } & {
                batchId: string;
                eventId: string;
            })[];
            targetDivisions: ({
                division: {
                    id: string;
                    batchId: string;
                    name: string;
                };
            } & {
                divisionId: string;
                eventId: string;
            })[];
        } & {
            eventId: string;
        }) | null;
        logs: ({
            reviewedBy: {
                id: string;
                fullName: string;
                role: import(".prisma/client").$Enums.Role;
            };
        } & {
            id: string;
            createdAt: Date;
            eventId: string;
            reviewedByUserId: string;
            action: string;
            comments: string | null;
        })[];
        attendees: ({
            student: {
                id: string;
                email: string;
                fullName: string;
                college: {
                    id: string;
                    tenantId: string;
                    name: string;
                } | null;
                course: {
                    id: string;
                    categoryId: string;
                    name: string;
                    durationYears: number;
                } | null;
            };
        } & {
            status: import(".prisma/client").$Enums.ParticipationStatus;
            createdAt: Date;
            eventId: string;
            studentId: string;
            qrToken: string;
        })[];
    } & {
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBySlug(tenantId: string, unitHandle: string, slug: string): Promise<{
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            about: string | null;
            logoUrl: string | null;
            coverUrl: string | null;
            websiteUrl: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        };
        createdBy: {
            id: string;
            email: string;
            fullName: string;
        };
        constraint: ({
            targetColleges: ({
                college: {
                    id: string;
                    tenantId: string;
                    name: string;
                };
            } & {
                collegeId: string;
                eventId: string;
            })[];
            targetCategories: ({
                category: {
                    id: string;
                    collegeId: string;
                    name: string;
                };
            } & {
                categoryId: string;
                eventId: string;
            })[];
            targetCourses: ({
                course: {
                    id: string;
                    categoryId: string;
                    name: string;
                    durationYears: number;
                };
            } & {
                courseId: string;
                eventId: string;
            })[];
            targetSpecializations: ({
                specialization: {
                    id: string;
                    courseId: string;
                    name: string;
                };
            } & {
                specializationId: string;
                eventId: string;
            })[];
            targetBatches: ({
                batch: {
                    id: string;
                    specializationId: string;
                    name: string;
                    enrollmentYear: number;
                    graduationYear: number;
                };
            } & {
                batchId: string;
                eventId: string;
            })[];
            targetDivisions: ({
                division: {
                    id: string;
                    batchId: string;
                    name: string;
                };
            } & {
                divisionId: string;
                eventId: string;
            })[];
        } & {
            eventId: string;
        }) | null;
    } & {
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(userId: string, unitId: string, eventData: any): Promise<{
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, userId: string, updateData: any): Promise<{
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    submitForApproval(eventId: string, userId: string): Promise<{
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    approveEvent(eventId: string, reviewedByUserId: string, comments?: string): Promise<{
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            about: string | null;
            logoUrl: string | null;
            coverUrl: string | null;
            websiteUrl: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    rejectEvent(eventId: string, reviewedByUserId: string, comments: string): Promise<{
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            about: string | null;
            logoUrl: string | null;
            coverUrl: string | null;
            websiteUrl: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    publishEvent(eventId: string, userId: string): Promise<{
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getEligibleEventsForStudent(studentId: string, tenantId: string): Promise<({
        unit: {
            id: string;
            name: string;
            handle: string;
            logoUrl: string | null;
        };
        constraint: ({
            targetColleges: {
                collegeId: string;
                eventId: string;
            }[];
            targetCategories: {
                categoryId: string;
                eventId: string;
            }[];
            targetCourses: {
                courseId: string;
                eventId: string;
            }[];
            targetSpecializations: {
                specializationId: string;
                eventId: string;
            }[];
            targetBatches: {
                batchId: string;
                eventId: string;
            }[];
            targetDivisions: {
                divisionId: string;
                eventId: string;
            }[];
        } & {
            eventId: string;
        }) | null;
        _count: {
            attendees: number;
        };
    } & {
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getEventsForOrganizer(unitId: string): Promise<({
        constraint: ({
            targetColleges: {
                collegeId: string;
                eventId: string;
            }[];
            targetCategories: {
                categoryId: string;
                eventId: string;
            }[];
            targetCourses: {
                courseId: string;
                eventId: string;
            }[];
            targetSpecializations: {
                specializationId: string;
                eventId: string;
            }[];
            targetBatches: {
                batchId: string;
                eventId: string;
            }[];
            targetDivisions: {
                divisionId: string;
                eventId: string;
            }[];
        } & {
            eventId: string;
        }) | null;
        _count: {
            attendees: number;
        };
    } & {
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getEventsPendingApproval(tenantId: string): Promise<({
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            tenantId: string;
            name: string;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            about: string | null;
            logoUrl: string | null;
            coverUrl: string | null;
            websiteUrl: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        };
        createdBy: {
            id: string;
            email: string;
            fullName: string;
        };
        constraint: ({
            targetColleges: ({
                college: {
                    id: string;
                    tenantId: string;
                    name: string;
                };
            } & {
                collegeId: string;
                eventId: string;
            })[];
            targetCategories: ({
                category: {
                    id: string;
                    collegeId: string;
                    name: string;
                };
            } & {
                categoryId: string;
                eventId: string;
            })[];
            targetCourses: ({
                course: {
                    id: string;
                    categoryId: string;
                    name: string;
                    durationYears: number;
                };
            } & {
                courseId: string;
                eventId: string;
            })[];
            targetSpecializations: ({
                specialization: {
                    id: string;
                    courseId: string;
                    name: string;
                };
            } & {
                specializationId: string;
                eventId: string;
            })[];
            targetBatches: ({
                batch: {
                    id: string;
                    specializationId: string;
                    name: string;
                    enrollmentYear: number;
                    graduationYear: number;
                };
            } & {
                batchId: string;
                eventId: string;
            })[];
            targetDivisions: ({
                division: {
                    id: string;
                    batchId: string;
                    name: string;
                };
            } & {
                divisionId: string;
                eventId: string;
            })[];
        } & {
            eventId: string;
        }) | null;
        logs: ({
            reviewedBy: {
                id: string;
                fullName: string;
                role: import(".prisma/client").$Enums.Role;
            };
        } & {
            id: string;
            createdAt: Date;
            eventId: string;
            reviewedByUserId: string;
            action: string;
            comments: string | null;
        })[];
    } & {
        id: string;
        unitId: string;
        createdByUserId: string;
        title: string;
        description: string;
        budgetAmount: number;
        status: import(".prisma/client").$Enums.EventStatus;
        date: Date | null;
        location: string | null;
        ticketTemplate: string;
        ticketBackgroundUrl: string | null;
        coverImageUrl: string | null;
        highlights: import("@prisma/client/runtime/library").JsonValue | null;
        schedule: import("@prisma/client/runtime/library").JsonValue | null;
        speakers: import("@prisma/client/runtime/library").JsonValue | null;
        rules: import("@prisma/client/runtime/library").JsonValue | null;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
