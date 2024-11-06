import { CreateClassroomUsecase } from "@/application/CreateClassroomUsecase";
import { NotFoundError, ValidationError } from "@/domain/errors";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";
import { IClassroomRepository, ITeacherRepository } from "@/domain/repositories";
import FindAllClassroomsUsecase from "@/application/FindAllClassroomsUsecase";
import FindClassroomUsecase from "@/application/FindClassroomUsecase";
import { AssignTeacherSubjectUsecase } from "@/application/AssignTeacherSubjectUsecase";
import { DeleteClassroomUsecase } from "@/application/DeleteClassroomUsecase";

export default class ClassroomController {
    private findAllClassroomsUsecase: FindAllClassroomsUsecase
    private findClassroomUsecase: FindClassroomUsecase
    private createClassroomUsecase: CreateClassroomUsecase
    private deleteClassroomUsecase: DeleteClassroomUsecase
    private assginTeacherSubjectUsecase: AssignTeacherSubjectUsecase

    constructor(classroomRepository: IClassroomRepository, teacherRepository: ITeacherRepository) {
        this.findAllClassroomsUsecase = new FindAllClassroomsUsecase(classroomRepository)
        this.findClassroomUsecase = new FindClassroomUsecase(classroomRepository)
        this.createClassroomUsecase = new CreateClassroomUsecase(classroomRepository)
        this.deleteClassroomUsecase = new DeleteClassroomUsecase(classroomRepository)
        this.assginTeacherSubjectUsecase = new AssignTeacherSubjectUsecase(classroomRepository, teacherRepository)
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.findAllClassroomsUsecase.execute()

            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            next(new ApiError())
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const response = await this.findClassroomUsecase.execute({ id })
            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            next(new ApiError())
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, grade } = req.body

            const response = await this.createClassroomUsecase.execute({ name, grade })

            res.status(201).send(response)
        }
        catch (e) {
            console.log(e)
            if (e instanceof ValidationError) {
                next(new ApiError(e.message, 422))
            }
            else {
                next(new ApiError())
            }
        }
    }

    async assignTeacherSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const { classroomId } = req.params
            const { teacherId, subjectCode } = req.body

            const response = await this.assginTeacherSubjectUsecase.execute({ classroomId, teacherId, subjectCode })

            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            if (e instanceof ValidationError) {
                next(new ApiError(e.message, 422))
            }
            else {
                next(new ApiError())
            }
        }
    }


    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { classroomId } = req.params

            const response = await this.deleteClassroomUsecase.execute({ classroomId })

            res.status(200).send(response)
        }
        catch (e) {
            console.log(e)
            if (e instanceof NotFoundError) {
                next(new ApiError(e.message, 404))
            }
            else if (e instanceof ValidationError) {
                next(new ApiError(e.message, 422))
            }
            else {
                next(new ApiError())
            }
        }
    }

}