import { IClassroomRepository } from "@/domain/repositories";

export class GenerateDummyHorariosUsecase {
    classroomRepository: IClassroomRepository

    constructor(classroomRepository: IClassroomRepository) {
        this.classroomRepository = classroomRepository
    }

    async execute() {
        const classrooms = await this.classroomRepository.findAll()

        classrooms.forEach(async (classroom) => {
            classroom.gerarDummyHorarios()

            await this.classroomRepository.update({
                id: classroom.id,
                horarios: classroom.horarios
            })
        })
    }
}