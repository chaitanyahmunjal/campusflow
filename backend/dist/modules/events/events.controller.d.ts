import { EventsService } from './events.service';
import { EventStatus } from '@prisma/client';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(user: any, status?: EventStatus, page?: number, limit?: number): Promise<{
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
                createdAt: Date;
                tenantId: string;
                name: string;
                updatedAt: Date;
                handle: string;
                type: import(".prisma/client").$Enums.UnitType;
                tagline: string | null;
                description: string | null;
                about: string | null;
                logoUrl: string | null;
                coverUrl: string | null;
                websiteUrl: string | null;
                socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
            };
            _count: {
                attendees: number;
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
            createdAt: Date;
            updatedAt: Date;
            unitId: string;
            description: string;
            status: import(".prisma/client").$Enums.EventStatus;
            createdByUserId: string;
            title: string;
            budgetAmount: number;
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getPendingApproval(user: any): Promise<({
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            tenantId: string;
            name: string;
            updatedAt: Date;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            description: string | null;
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
            action: string;
            eventId: string;
            reviewedByUserId: string;
            comments: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    })[]>;
    getEligibleEvents(user: any): Promise<({
        unit: {
            id: string;
            name: string;
            handle: string;
            logoUrl: string | null;
        };
        _count: {
            attendees: number;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    })[]>;
    getMyEvents(user: any, unitId: string): Promise<({
        _count: {
            attendees: number;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    })[]>;
    findOne(id: string): Promise<{
        unit: {
            faculties: ({
                user: {
                    id: string;
                    email: string;
                    prn: string | null;
                    passwordHash: string | null;
                    fullName: string;
                    role: import(".prisma/client").$Enums.Role;
                    isActive: boolean;
                    createdAt: Date;
                    tenantId: string | null;
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
                    email: string;
                    prn: string | null;
                    passwordHash: string | null;
                    fullName: string;
                    role: import(".prisma/client").$Enums.Role;
                    isActive: boolean;
                    createdAt: Date;
                    tenantId: string | null;
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
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            tenantId: string;
            name: string;
            updatedAt: Date;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            description: string | null;
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
            action: string;
            eventId: string;
            reviewedByUserId: string;
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
            createdAt: Date;
            status: import(".prisma/client").$Enums.ParticipationStatus;
            qrToken: string;
            eventId: string;
            studentId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
    findBySlug(user: any, unitHandle: string, slug: string): Promise<{
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            tenantId: string;
            name: string;
            updatedAt: Date;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            description: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
    create(user: any, unitId: string, eventData: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
    update(user: any, id: string, updateData: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
    submitForApproval(user: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
    approveEvent(user: any, id: string, body: {
        comments?: string;
    }): Promise<{
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            tenantId: string;
            name: string;
            updatedAt: Date;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            description: string | null;
            about: string | null;
            logoUrl: string | null;
            coverUrl: string | null;
            websiteUrl: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
    rejectEvent(user: any, id: string, body: {
        comments: string;
    }): Promise<{
        unit: {
            wallet: {
                unitId: string;
                allocatedBudget: number;
                spentBudget: number;
                lockedBudget: number;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            tenantId: string;
            name: string;
            updatedAt: Date;
            handle: string;
            type: import(".prisma/client").$Enums.UnitType;
            tagline: string | null;
            description: string | null;
            about: string | null;
            logoUrl: string | null;
            coverUrl: string | null;
            websiteUrl: string | null;
            socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
    publishEvent(user: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitId: string;
        description: string;
        status: import(".prisma/client").$Enums.EventStatus;
        createdByUserId: string;
        title: string;
        budgetAmount: number;
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
    }>;
}
