import { IUserRepository } from '@/domain/repositories'
import { IJwtService } from '@/domain/services'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors'

export class AuthMiddleware {
    private userRepository: IUserRepository
    private jwtService: IJwtService

    constructor(userRepository: IUserRepository, jwtService: IJwtService) {
        this.userRepository = userRepository
        this.jwtService = jwtService
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = this.extractBearerToken(req)

        if (!token) {
            return next(new ApiError('Bearer token is missing.', 401))
        }

        const { id } = this.jwtService.decode(token)

        const user = await this.userRepository.findById(id)

        res.locals['user'] = user

        next()
    }

    private extractBearerToken(req: Request) {
        const authHeader = req.headers.authorization

        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7, authHeader.length)
        }

        return null
    }
}
