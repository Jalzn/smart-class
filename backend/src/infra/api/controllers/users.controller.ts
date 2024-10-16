import {
    CreateUserUsecase,
    DeleteUserUsecase,
    FindUserUsecase,
    ListUsersUsecase,
} from '@/application/users'
import { ValidationError } from '@/domain/errors'
import { NotFoundError } from '@/domain/errors/NotFoundError'
import { prisma } from '@/infra/database'
import { UserRepository } from '@/infra/repositories'
import { Context, Controller, Delete, Get, Post } from '@/infra/server'
import { HashService } from '@/infra/services/hash.service'
import { ApiError } from '../errors'

@Controller('/users')
export default class UsersController {
    private listUsersUsecase: ListUsersUsecase
    private findUserUsecase: FindUserUsecase
    private createUserUsercase: CreateUserUsecase
    private deleteUserUsecase: DeleteUserUsecase

    constructor() {
        const userRepository = new UserRepository(prisma)
        const hashService = new HashService()

        this.listUsersUsecase = new ListUsersUsecase(userRepository)
        this.findUserUsecase = new FindUserUsecase(userRepository)
        this.createUserUsercase = new CreateUserUsecase(
            userRepository,
            hashService
        )
        this.deleteUserUsecase = new DeleteUserUsecase(userRepository)
    }

    @Get()
    async findAll(ctx: Context) {
        try {
            const response = await this.listUsersUsecase.execute()

            ctx.send(response)
        } catch {
            throw new ApiError()
        }
    }

    @Get('/:id')
    async findOneById(ctx: Context) {
        try {
            const { id } = ctx.params()

            const response = await this.findUserUsecase.execute({ id })

            ctx.send(response)
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new ApiError(err.message, 404)
            } else {
                throw new ApiError()
            }
        }
    }

    @Post()
    async create(ctx: Context) {
        try {
            const { email, password } = ctx.body()

            const response = await this.createUserUsercase.execute({
                email,
                password,
            })

            ctx.send(response)
        } catch (err) {
            if (err instanceof ValidationError) {
                throw new ApiError(err.message, 422)
            } else {
                throw new ApiError()
            }
        }
    }

    @Delete('/:id')
    async delete(ctx: Context) {
        try {
            const { id } = ctx.params()

            const response = await this.deleteUserUsecase.execute({ id })

            ctx.send(response)
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new ApiError(err.message, 404)
            } else {
                throw new ApiError()
            }
        }
    }
}
