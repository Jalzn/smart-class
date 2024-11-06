import { Teacher } from "@/domain/entities";
import { ITeacherRepository } from "@/domain/repositories";

type FindAllTeachersOutputDTO = {
    teachers: Teacher[]
}

export class FindAllTeachersUsecase {
    private teacherRepository: ITeacherRepository

    constructor(teacherRepository: ITeacherRepository) {
        this.teacherRepository = teacherRepository
    }

    async execute(): Promise<FindAllTeachersOutputDTO> {
        const teachers = await this.teacherRepository.findAll()

        return { teachers }
    }
}