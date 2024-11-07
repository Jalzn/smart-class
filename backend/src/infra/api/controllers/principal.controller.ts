import { IPrincipalRepository } from "@/domain/repositories"
import { CreatePrincipalUsecase } from '@/application/CreatePrincipalUsecase'
import { FindByIdPrincipalUsecase } from '@/application/FindByIdPrincipalUsecase'
import { deletePrincipalUsecase } from '@/application/DeletePrincipalUsecase'
import { NextFunction, Request, Response } from 'express'
import { AlreadyExistsError, NotFoundError, ValidationError } from "@/domain/errors"
import { ApiError } from "../errors"

export class PrincipalController {
    private findByIdPrincipalUsecase: FindByIdPrincipalUsecase
    private createPrincipalUsecase: CreatePrincipalUsecase
    private DeletePrincipalUsecase: deletePrincipalUsecase
    
    constructor(
        PrincipalRepository: IPrincipalRepository,
    ) {
        this.findByIdPrincipalUsecase = new FindByIdPrincipalUsecase(PrincipalRepository)
        this.createPrincipalUsecase = new CreatePrincipalUsecase(PrincipalRepository)
        this.DeletePrincipalUsecase = new deletePrincipalUsecase(PrincipalRepository)
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.createPrincipalUsecase.execute(req.body)
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
            console.log(id)
            const response = await this.findByIdPrincipalUsecase.execute({ id })
            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            next(new ApiError())
        }
    }

    async deletePrincipal(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params
            console.log(id)
            const response = await this.DeletePrincipalUsecase.execute({id})
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
