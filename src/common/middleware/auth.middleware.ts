import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('No authorization header provided');
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new UnauthorizedException(
                'Authorization header must follow the format: Bearer <token>',
            );
        }

        const token = parts[1];

        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        // Token is present — proceed to the next handler
        next();
    }
}
