import { LoginUsecase } from '@/application/auth/LoginUsecase'
import {
    NotFoundError,
    UnauthorizedError,
    ValidationError,
} from '@/domain/errors'
import { IUserRepository } from '@/domain/repositories'
import { IHashService, IJwtService } from '@/domain/services'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors'

export class AuthController {
    private loginUsecase: LoginUsecase

    constructor(
        userRepository: IUserRepository,
        jwtService: IJwtService,
        hashService: IHashService
    ) {
        this.loginUsecase = new LoginUsecase(
            userRepository,
            jwtService,
            hashService
        )
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const response = await this.loginUsecase.execute({
                email,
                password,
            })

            res.status(200).send(response)
        } catch (e) {
            if (e instanceof ValidationError) {
                next(new ApiError(e.message, 422))
            }
            if (e instanceof UnauthorizedError) {
                next(new ApiError('Invalid email or password.', 401))
            } else if (e instanceof NotFoundError) {
                next(new ApiError('Invalid email or password.', 401))
            } else {
                next(new ApiError())
            }
        }
    }
}
