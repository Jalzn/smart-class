import {
    CreateUserUsecase,
    DeleteUserUsecase,
    FindUserUsecase,
    ListUsersUsecase,
} from '@/application/users'
import { ValidationError } from '@/domain/errors'
import { NotFoundError } from '@/domain/errors/NotFoundError'
import { IHashService } from '@/domain/services'
import { UserRepository } from '@/infra/repositories'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors'

export default class UsersController {
    private listUsersUsecase: ListUsersUsecase
    private findUserUsecase: FindUserUsecase
    private createUserUsercase: CreateUserUsecase
    private deleteUserUsecase: DeleteUserUsecase

    constructor(userRepository: UserRepository, hashService: IHashService) {
        this.listUsersUsecase = new ListUsersUsecase(userRepository)
        this.findUserUsecase = new FindUserUsecase(userRepository)
        this.createUserUsercase = new CreateUserUsecase(
            userRepository,
            hashService
        )
        this.deleteUserUsecase = new DeleteUserUsecase(userRepository)
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.listUsersUsecase.execute()
            res.status(200).send(response)
        } catch (e) {
            throw new ApiError()
        }
    }

    async findOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const response = await this.findUserUsecase.execute({ id })

            res.status(200).send(response)
        } catch (err) {
            if (err instanceof NotFoundError) {
                next(new ApiError(err.message, 404))
            } else {
                next(new ApiError())
            }
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const response = await this.createUserUsercase.execute({
                email,
                password,
            })

            res.status(201).send(response)
        } catch (err) {
            if (err instanceof ValidationError) {
                next(new ApiError(err.message, 422))
            } else {
                next(new ApiError())
            }
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const response = await this.deleteUserUsecase.execute({ id })

            res.status(200).send(response)
        } catch (err) {
            if (err instanceof NotFoundError) {
                next(new ApiError(err.message, 404))
            } else {
                next(new ApiError())
            }
        }
    }
}
