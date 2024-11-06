import School from "@/domain/entities/School"
import { ValidationError } from "@/domain/errors"
import { ISchoolRepository } from "@/domain/repositories"



type findByIdSchoolInputDTO = {
    id: string
}

type findByIdSchoolOutputDTO = {
    School: School
}

export class findByIdSchoolUsecase {
    private SchoolRepository: ISchoolRepository

    constructor(SchoolRepository: ISchoolRepository) {
        this.SchoolRepository = SchoolRepository
    }

    async execute({id}: findByIdSchoolInputDTO): Promise<findByIdSchoolOutputDTO> {
        if (!id) {
            throw new ValidationError("id is missing")
        }
        const School = await this.SchoolRepository.findById(id)

        return { School }
    }


}