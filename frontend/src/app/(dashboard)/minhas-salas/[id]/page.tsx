import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage"
import QuadroProfessorMateria from "@/components/QuadroProfessorMateria"
import { Container, Heading, Text } from "@chakra-ui/react"

export default async function ({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const classroom = await fetchClassroom()

    async function fetchClassroom() {
        const res = await fetch(`http://127.0.0.1:3333/classrooms/${id}`)

        if (res.ok) {
            const { classroom } = await res.json()

            return classroom
        }

        return null
    }

    if (!classroom) {
        return <p>Failed to fecth classroom</p>
    }

    if (!classroom.quadroTeacherSubject) {
        return <p>Failed to fecth classroom</p>
    }

    return (
        <>
            <HeaderPage>
                <HeaderPageTitle>Minhas Salas / {classroom.name} </HeaderPageTitle>
            </HeaderPage>
            <Container>
                <QuadroProfessorMateria quadroProfessorMateria={classroom.quadroTeacherSubject} />
            </Container>
        </>
    )
}