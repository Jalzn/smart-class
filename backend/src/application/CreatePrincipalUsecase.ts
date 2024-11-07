import Principal from "@/domain/entities/Principal"
import { ValidationError } from "@/domain/errors"
import { IPrincipalRepository } from "@/domain/repositories"



type CreatePrincipalInputDTO = {
    name: string

}
type CreatePrincipalOutputDTO = {
    principal: Principal
}

export class CreatePrincipalUsecase {
    private principalRepository: IPrincipalRepository

    constructor(principalRepository: IPrincipalRepository) {
        this.principalRepository = principalRepository
    }

    async execute({ name}: CreatePrincipalInputDTO): Promise<CreatePrincipalOutputDTO> {
        if (!name) {
            throw new ValidationError("Name is missing")
        }
        const principal = Principal.create(name)

        await this.principalRepository.create(principal)

        return { principal }
    }


}