import Classroom, { ClassroomGrade } from "@/domain/entities/Classroom"
import { ValidationError } from "@/domain/errors"
import { IClassroomRepository } from "@/domain/repositories"

type CreateClassroomInputDTO = {
    name: string
    grade: ClassroomGrade
}

type CreateClassroomOutputDTO = {
    classroom: Classroom
}

export class CreateClassroomUsecase {
    private classroomRepository: IClassroomRepository

    constructor(classroomRepository: IClassroomRepository) {
        this.classroomRepository = classroomRepository
    }

    async execute({ name, grade }: CreateClassroomInputDTO): Promise<CreateClassroomOutputDTO> {
        if (!name) {
            throw new ValidationError("Name is missing")
        }

        if (!grade) {
            throw new ValidationError("Grade is missing")
        }

        if (typeof grade !== "number") {
            throw new ValidationError("Grade should be a number")
        }

        const classroom = Classroom.create(name, grade)

        await this.classroomRepository.create(classroom)

        return { classroom }
    }
}