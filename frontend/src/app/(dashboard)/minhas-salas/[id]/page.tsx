import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage"
import { Container } from "@chakra-ui/react"

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

    return (
        <>
            <HeaderPage>
                <HeaderPageTitle>Minhas Salas / {classroom?.name} </HeaderPageTitle>
            </HeaderPage>
            <Container>

                <p>Hello sala {classroom?.id}</p>
            </Container>
        </>
    )
}