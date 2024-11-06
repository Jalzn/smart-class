import { Classroom } from "@/domain/entities"
import { IClassroomRepository } from "@/domain/repositories"

type FindAllClassroomsOutputDTO = {
    classrooms: Classroom[]
}

export default class FindAllClassroomsUsecase {
    private classroomRepository: IClassroomRepository

    constructor(classroomRepository: IClassroomRepository) {
        this.classroomRepository = classroomRepository
    }

    async execute(): Promise<FindAllClassroomsOutputDTO> {
        const classrooms = await this.classroomRepository.findAll()

        return { classrooms }
    }
}