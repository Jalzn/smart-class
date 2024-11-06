import { Classroom } from "@/domain/entities"

describe('Create Classroom Usecase', () => {
    test(('Deve criar um quadro de professores x materia com as materias default'), () => {
        const classroom = Classroom.create("Foobar", 1)

        expect(classroom.quadroTeacherSubject).toHaveLength(12)
    })
})