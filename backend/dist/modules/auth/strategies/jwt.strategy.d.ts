import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthPayload } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: AuthPayload): Promise<{
        sub: string;
        email: string;
        role: string;
        tenantId: string | undefined;
    }>;
}
export {};
