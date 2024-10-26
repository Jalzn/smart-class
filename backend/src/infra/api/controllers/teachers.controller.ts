import { RegisterTeacherUsecase } from "@/application/teachers/usecases/register-teacher.usecase";
import { AlreadyExistsError, ValidationError } from "@/domain/errors";
import { ITeacherRepository, IUserRepository } from "@/domain/repositories";
import { IHashService, IJwtService } from "@/domain/services";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";

export class TeachersController {
    private registerTeacherUsecase: RegisterTeacherUsecase

    constructor(
        teacherRepository: ITeacherRepository,
        userRepository: IUserRepository,
        jwtService: IJwtService,
        hashService: IHashService
    ) {
        this.registerTeacherUsecase = new RegisterTeacherUsecase(
            teacherRepository,
            userRepository,
            jwtService,
            hashService
        )
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.registerTeacherUsecase.execute(req.body)
            res.status(201).send(response)
        } catch(e) {
            if(e instanceof ValidationError) {
                next(new ApiError(e.message, 422))
            }
            else if(e instanceof AlreadyExistsError) {
                next(new ApiError(e.message, 422))
            }
            else {
                next(new ApiError())
            }
        }
    }
}