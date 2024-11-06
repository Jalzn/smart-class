import { IStudentRepository } from "@/domain/repositories"
import { CreateStudentUsecase } from '@/application/CreateStudentUsecase'
import { findByIdStudentsUsecase } from '@/application/FindByIdStudentsUsecase'
import { deleteStudentUsecase } from '@/application/DeleteStudentUsecase'
import { NextFunction, Request, Response } from 'express'
import { AlreadyExistsError, NotFoundError, ValidationError } from "@/domain/errors"
import { ApiError } from "../errors"

export class StudentController {
    private findByIdStudentsUsecase: findByIdStudentsUsecase
    private createStudentUsecase: CreateStudentUsecase
    private DeleteStudentUsecase: deleteStudentUsecase

    constructor(
        studentRepository: IStudentRepository,
    ) {
        this.findByIdStudentsUsecase = new findByIdStudentsUsecase(studentRepository)
        this.createStudentUsecase = new CreateStudentUsecase(studentRepository)
        this.DeleteStudentUsecase = new deleteStudentUsecase(studentRepository)
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.createStudentUsecase.execute(req.body)
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
            const response = await this.findByIdStudentsUsecase.execute({ id })
            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            next(new ApiError())
        }
    }

    async deleteStudent(req: Request, res: Response, next: NextFunction){
        try {
            const { StudentId } = req.params
            const response = await this.DeleteStudentUsecase.execute(StudentId)
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
