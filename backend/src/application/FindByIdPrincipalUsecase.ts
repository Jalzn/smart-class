import Principal from "@/domain/entities/Principal"
import { ValidationError } from "@/domain/errors"
import { IPrincipalRepository } from "@/domain/repositories"



type findByIdPrincipalInputDTO = {
    id: string
}

type findByIdPrincipalOutputDTO = {
    principal: Principal
}

export class FindByIdPrincipalUsecase {
    
    private principalRepository: IPrincipalRepository

    constructor(principalRepository: IPrincipalRepository) {
        this.principalRepository = principalRepository
    }

    async execute({ id}: findByIdPrincipalInputDTO): Promise<findByIdPrincipalOutputDTO> {
        if (!id) {
            throw new ValidationError("id is missing")
        }
        const principal = await this.principalRepository.findById(id)

        return { principal }
    }


}