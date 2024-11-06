import CreateClassroomDialog from "@/components/dialogs/CreateClassroomDialog";
import CreateClassroomForm from "@/components/forms/CreateClassroomForm";
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage";
import { Button } from "@/components/ui/button";
import { DialogBackdrop, DialogContent, DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { Box, Card, Container, DialogBody, Flex, Grid, GridItem, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { BsFillMortarboardFill } from "react-icons/bs";

export default async function MinhasSalasPage() {
    revalidatePath('/')

    const classrooms: any[] = await fetchMinhasSalas()

    async function fetchMinhasSalas() {
        const res = await fetch('http://localhost:3333/classrooms')

        if (res.ok) {
            const { classrooms } = await res.json()
            return classrooms
        }

        return []
    }

    return (
        <>
            <HeaderPage>
                <HeaderPageTitle>Minhas Salas</HeaderPageTitle>
            </HeaderPage>
            <Container>
                <Flex align="end" mb={4}>
                    <CreateClassroomDialog />
                </Flex>
                <Grid templateColumns="repeat(4, 1fr)" gap={8}>
                    {classrooms.map(c => (
                        <GridItem key={c.id}>
                            <Card.Root>
                                <Card.Header>
                                    <HStack>
                                        <Heading>
                                            <BsFillMortarboardFill />
                                        </Heading>
                                        <Heading>
                                            {c.name}
                                        </Heading>
                                    </HStack>
                                </Card.Header>
                                <Card.Body>
                                    <VStack align="start">
                                        <Text>Serie: {c.grade}</Text>
                                        <Text>Total de alunos: 0</Text>
                                    </VStack>
                                </Card.Body>
                                <Card.Footer>
                                    <Button asChild size="sm" ms="auto">
                                        <Link href={`/minhas-salas/${c.id}`}>Acessar</Link>
                                    </Button>
                                </Card.Footer>
                            </Card.Root>
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </>
    )
}