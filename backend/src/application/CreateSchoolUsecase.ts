import School from "@/domain/entities/School"
import { ISchoolRepository } from "@/domain/repositories"



type CreateschoolOutputDTO = {
    school: School
}

export class CreateschoolUsecase {
    private schoolRepository: ISchoolRepository

    constructor(schoolRepository: ISchoolRepository) {
        this.schoolRepository = schoolRepository
    }

    async execute(): Promise<CreateschoolOutputDTO> {
        const school = School.create()

        await this.schoolRepository.create(school)

        return { school }
    }


}