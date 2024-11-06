import { ValidationError } from "@/domain/errors";
import { ISchoolRepository } from "@/domain/repositories";


type deleteSchoolInputDTO = {
    SchoolId: string
}

export class DeleteSchoolUsecase {
    
    
    private SchoolRepository: ISchoolRepository

    constructor(SchoolRepository: ISchoolRepository) {
        this.SchoolRepository = SchoolRepository
    }

    async execute({SchoolId}: deleteSchoolInputDTO) {
        if (!SchoolId) {
            throw new ValidationError("School id is missing.")
        }

        await this.SchoolRepository.deleteById(SchoolId)
    }

}