import { generateHorarios } from "@/actions/classroom.action"
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage"
import { Button } from "@/components/ui/button"
import { Box, Center, Container, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import { revalidatePath } from "next/cache"

export default async function () {
    revalidatePath('/')

    const classrooms: any[] = await fetchClassrooms()

    async function fetchClassrooms() {
        const res = await fetch("http://127.0.0.1:3333/classrooms")

        if (res.ok) {
            const { classrooms } = await res.json()
            return classrooms
        }

        return []
    }

    return (
        <>
            <HeaderPage>
                <HeaderPageTitle>Inicio</HeaderPageTitle>
            </HeaderPage>
            <Container>
                <form action={generateHorarios}>
                    <Flex mb={4} align="end">
                        <Button ms="auto" colorPalette="teal" type="submit">Gerar Horarios</Button>
                    </Flex>
                </form>
                {classrooms.map(classroom => (
                    <Box key={classroom.id} mb={4}>
                        <Heading size="2xl" mb={4}>{classroom.name}</Heading>
                        <Box p={4} bg="white">
                            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                                {["Segunda", "Terca", "Quarta", "Quinta", "Sexta"].map((day, i) => (
                                    <GridItem key={i}>
                                        <Center>
                                            <Text fontWeight="bold">{day}</Text>
                                        </Center>
                                    </GridItem>
                                ))}
                                {classroom.horarios.map((h, i) => (
                                    <GridItem key={i}>
                                        <Center p={2} bg="orange.300" rounded="md">
                                            {h.subjectCode}
                                        </Center>
                                    </GridItem>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                ))}
            </Container>
        </>
    )
}