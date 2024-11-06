import { AlreadyExistsError, NotFoundError, ValidationError } from "@/domain/errors"
import { ISchoolRepository } from "@/domain/repositories"
import { NextFunction, Request, Response } from 'express'
import { ApiError } from "../errors"
import { CreateschoolUsecase } from '@/application/CreateSchoolUsecase'
import { findByIdSchoolUsecase } from "@/application/FindByIdSchoolUsecase"
import { DeleteSchoolUsecase } from '@/application/DeleteSchoolUsecase'


export class SchoolController {
   private findByIdSchoolUsecase: findByIdSchoolUsecase
    private createSchoolUsecase: CreateschoolUsecase
    private deleteSchoolUsecase: DeleteSchoolUsecase

    constructor(
        SchoolRepository: ISchoolRepository,
    ) {
        this.findByIdSchoolUsecase = new findByIdSchoolUsecase(SchoolRepository)
        this.createSchoolUsecase = new CreateschoolUsecase(SchoolRepository)
        this.deleteSchoolUsecase = new DeleteSchoolUsecase(SchoolRepository)
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.createSchoolUsecase.execute()
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


    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const response = await this.findByIdSchoolUsecase.execute({ id })
            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            next(new ApiError())
        }
    }

    async deleteSchool(req: Request, res: Response, next: NextFunction){
        try {
            const { SchoolId } = req.params
            const response = await this.deleteSchoolUsecase.execute({SchoolId})
            res.status(200).send({response})
        } 
        catch (e){
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
