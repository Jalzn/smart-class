import { Subject, Teacher } from "@/domain/entities";
import { ValidationError } from "@/domain/errors";
import { ITeacherRepository } from "@/domain/repositories";
import { SubjectCode } from "@/domain/types";

type RegisterTeacherInputDTO = {
    name: string
    subjectCodes: SubjectCode[]
}

type RegisterTeacherOutputDTO = {
    teacher: Teacher
}

export class RegisterTeacherUsecase {
    private teacherRepository: ITeacherRepository

    constructor(teacherRepository: ITeacherRepository) {
        this.teacherRepository = teacherRepository
    }

    async execute({ name, subjectCodes }: RegisterTeacherInputDTO): Promise<RegisterTeacherOutputDTO> {
        if (!name) {
            throw new ValidationError("Name is missing.")
        }

        if (!subjectCodes || subjectCodes.length < 0) {
            throw new ValidationError("Subject code is missing.")
        }

        const teacher = Teacher.create(name)

        subjectCodes.forEach(subjectCode => {
            const subject = Subject.create(subjectCode)
            teacher.subjects.push(subject)
        })

        await this.teacherRepository.create(teacher)

        return { teacher }
    }
}