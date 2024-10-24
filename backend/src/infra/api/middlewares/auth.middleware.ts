import { IUserRepository } from "@/domain/repositories";
import { NextFunction, Response, Request } from "express";
import { ApiError } from "../errors";
import { IJwtService } from "@/domain/services";

export class AuthMiddleware {
    private userRepository: IUserRepository
    private jwtService: IJwtService

    constructor(userRepository: IUserRepository, jwtService: IJwtService) {
        this.userRepository = userRepository
        this.jwtService = jwtService
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = this.extractBearerToken(req) 

        if(!token) {
            return next(new ApiError("Bearer token is missing.", 401))
        }

        next()
    }

    private extractBearerToken(req: Request) {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
          return authHeader.substring(7, authHeader.length);
        }
      
        return null;
    }
}