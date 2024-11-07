import DeleteSalaDialog from "@/components/dialogs/DeleteSalaDialog"
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage"
import QuadroProfessorMateria from "@/components/QuadroProfessorMateria"
<<<<<<< HEAD
import { Box, Center, Container, Flex, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react"
import { revalidatePath } from "next/cache"
=======
import { Container, Heading, Text } from "@chakra-ui/react"
import { API_URL } from "@/utils";
>>>>>>> a51aa73a63fa895da4989e131cfeecc234a28103

export default async function ({ params }: { params: Promise<{ id: string }> }) {
    revalidatePath('/')

    const id = (await params).id

    const classroom = await fetchClassroom()
    const horarios: any[] = classroom.horarios

    async function fetchClassroom() {
        const res = await fetch(API_URL + `/classrooms/${id}`)

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
                <VStack gap={4} align="stretch">
                    <Flex align="end">
                        <DeleteSalaDialog />
                    </Flex>
                    <QuadroProfessorMateria quadroProfessorMateria={classroom.quadroTeacherSubject} />
                    <Heading>Horarios da Turma</Heading>
                    <Box p={4} bg="white">
                        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                            {["Segunda", "Terca", "Quarta", "Quinta", "Sexta"].map((day, i) => (
                                <GridItem key={i}>
                                    <Center>
                                        <Text fontWeight="bold">{day}</Text>
                                    </Center>
                                </GridItem>
                            ))}
                            {horarios.map((h, i) => (
                                <GridItem key={i}>
                                    <Center p={2} bg="orange.300" rounded="md">
                                        {h.subjectCode}
                                    </Center>
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                </VStack>
            </Container>
        </>
    )
}