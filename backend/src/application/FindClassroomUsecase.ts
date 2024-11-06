import { Classroom } from "@/domain/entities"
import { IClassroomRepository } from "@/domain/repositories"

type FindAllClassroomsInputDTO = {
    id: string
}

type FindAllClassroomsOutputDTO = {
    classroom: Classroom
}

export default class FindClassroomUsecase {
    private classroomRepository: IClassroomRepository

    constructor(classroomRepository: IClassroomRepository) {
        this.classroomRepository = classroomRepository
    }

    async execute({ id }: FindAllClassroomsInputDTO): Promise<FindAllClassroomsOutputDTO> {
        const classroom = await this.classroomRepository.findById(id)

        return { classroom }
    }
}