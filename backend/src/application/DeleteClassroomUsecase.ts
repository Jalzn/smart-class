import { ValidationError } from "@/domain/errors";
import { IClassroomRepository } from "@/domain/repositories";

type DeleteClassroomInputDTO = {
    classroomId: string
}

export class DeleteClassroomUsecase {
    private classroomRepository: IClassroomRepository

    constructor(classroomRepository: IClassroomRepository) {
        this.classroomRepository = classroomRepository
    }

    async execute({ classroomId }: DeleteClassroomInputDTO) {
        if (!classroomId) {
            throw new ValidationError("Classroom id is missing.")
        }

        await this.classroomRepository.deleteById(classroomId)
    }
}