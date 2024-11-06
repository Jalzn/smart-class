import DeleteSalaDialog from "@/components/dialogs/DeleteSalaDialog"
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage"
import QuadroProfessorMateria from "@/components/QuadroProfessorMateria"
import { Button } from "@/components/ui/button"
import { Container, Flex, Heading, Text } from "@chakra-ui/react"

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
                <Flex align="end">
                    <DeleteSalaDialog />
                </Flex>
                <QuadroProfessorMateria quadroProfessorMateria={classroom.quadroTeacherSubject} />
            </Container>
        </>
    )
}