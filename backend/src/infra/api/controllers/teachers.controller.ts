import { RegisterTeacherUsecase } from '@/application/RegisterTeacherUsecase'
import { AlreadyExistsError, NotFoundError, ValidationError } from '@/domain/errors'
import { ITeacherRepository, IUserRepository } from '@/domain/repositories'
import { IHashService, IJwtService } from '@/domain/services'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors'
import { FindAllTeachersUsecase } from '@/application/FindAllTeachersUsecase'
import { DeleteTeacherUsecase } from '@/application/DeleteTeacherUsecase'

export class TeachersController {
    private findAllTeachersUsecase: FindAllTeachersUsecase
    private registerTeacherUsecase: RegisterTeacherUsecase
    private DeleteTeacherUsecase: DeleteTeacherUsecase

    constructor(
        teacherRepository: ITeacherRepository,
    ) {
        this.findAllTeachersUsecase = new FindAllTeachersUsecase(teacherRepository)
        this.registerTeacherUsecase = new RegisterTeacherUsecase(teacherRepository)
        this.DeleteTeacherUsecase = new DeleteTeacherUsecase(teacherRepository)
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.findAllTeachersUsecase.execute()
            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            next(new ApiError())
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.registerTeacherUsecase.execute(req.body)
            res.status(201).send(response)
        } catch (e) {
            console.log(e)
            if (e instanceof ValidationError) {
                next(new ApiError(e.message, 422))
            } else if (e instanceof AlreadyExistsError) {
                next(new ApiError(e.message, 422))
            } else {
                next(new ApiError())
            }
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { teacherId } = req.params
            const response = await this.DeleteTeacherUsecase.execute(teacherId)
            res.status(200).send({})
        } catch (e) {
            console.log(e)
            if (e instanceof NotFoundError) {
                next(new ApiError(e.message, 404))
            }
            else {
                next(new ApiError())
            }
        }
    }
}
