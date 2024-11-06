import { LoginUsecase } from '@/application/auth/LoginUsecase'
import {
    AlreadyExistsError,
    NotFoundError,
    UnauthorizedError,
    ValidationError,
} from '@/domain/errors'
import { IUserRepository } from '@/domain/repositories'
import { IHashService, IJwtService } from '@/domain/services'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors'
import { RegisterUsecase } from '@/application/auth/RegisterUsecase'

export class AuthController {
    private loginUsecase: LoginUsecase
    private registerUsecase: RegisterUsecase

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

        this.registerUsecase = new RegisterUsecase(
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

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const response = await this.registerUsecase.execute({ email, password })

            res.status(200).send(response)
        } catch (e) {
            console.log(e)

            if (e instanceof ValidationError) {
                next(new ApiError(e.message, 422))
            }
            else if (e instanceof AlreadyExistsError) {
                next(new ApiError(e.message, 422))
            }
            else {
                next(new ApiError())
            }
        }
    }
}
