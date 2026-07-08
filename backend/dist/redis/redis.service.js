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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_1 = require("redis");
let RedisService = class RedisService {
    constructor(configService) {
        this.configService = configService;
        this.client = null;
        this.isConnected = false;
    }
    async onModuleInit() {
        const host = this.configService.get('REDIS_HOST', 'localhost');
        const port = this.configService.get('REDIS_PORT', 6379);
        try {
            this.client = (0, redis_1.createClient)({
                url: `redis://${host}:${port}`,
            });
            this.client.on('error', (err) => {
                this.isConnected = false;
            });
            await this.client.connect();
            this.isConnected = true;
            console.log('✅ Redis connected');
        }
        catch (error) {
            console.log('⚠️  Redis not available - running without caching');
            this.isConnected = false;
        }
    }
    async onModuleDestroy() {
        if (this.client && this.isConnected) {
            await this.client.quit();
        }
    }
    isAvailable() {
        return this.isConnected && this.client !== null;
    }
    async get(key) {
        if (!this.isConnected || !this.client)
            return null;
        try {
            return this.client.get(key);
        }
        catch {
            return null;
        }
    }
    async set(key, value, ttl) {
        if (!this.isConnected || !this.client)
            return;
        try {
            if (ttl) {
                await this.client.setEx(key, ttl, value);
            }
            else {
                await this.client.set(key, value);
            }
        }
        catch { }
    }
    async del(key) {
        if (!this.isConnected || !this.client)
            return;
        try {
            await this.client.del(key);
        }
        catch { }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map