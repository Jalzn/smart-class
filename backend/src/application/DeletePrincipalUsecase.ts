import { ValidationError } from "@/domain/errors";
import { IPrincipalRepository } from "@/domain/repositories";

type deletePrincipalInputDTO = {
    id: string
}

export class deletePrincipalUsecase {
    private PrincipalRepository: IPrincipalRepository

    constructor(PrincipalRepository: IPrincipalRepository) {
        this.PrincipalRepository = PrincipalRepository
    }

    async execute({id}: deletePrincipalInputDTO) {
        if (!id) {
            throw new ValidationError("id is missing.")
        }

        await this.PrincipalRepository.deleteById(id)
    }
}