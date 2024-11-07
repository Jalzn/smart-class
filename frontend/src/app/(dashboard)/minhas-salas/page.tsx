'use client'
import CreateClassroomDialog from "@/components/dialogs/CreateClassroomDialog";
import CreateClassroomForm from "@/components/forms/CreateClassroomForm";
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage";
import { Button } from "@/components/ui/button";
import { DialogBackdrop, DialogContent, DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { Box, Card, Container, DialogBody, Flex, Grid, GridItem, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { BsFillMortarboardFill } from "react-icons/bs";
import { API_URL } from "@/utils";
import { useEffect, useState } from "react";

export default function MinhasSalasPage() {
    //revalidatePath('/')

    const [classrooms, setClassrooms] = useState([{ id: '', name:'', grade: ''}])
    const [close, setClose] = useState(true)

    useEffect(() => {
        fetchClassrooms().then((data) => {
            setClassrooms(data)
        });
    }, [close]);

    async function fetchClassrooms() {
        const res = await fetch(API_URL + '/classrooms', { mode: 'cors' })

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
                    <CreateClassroomDialog onClose={() => setClose(false)}/>
                </Flex>
                <Grid templateColumns="repeat(4, 1fr)" gap={8}>
                    {classrooms.map(c => (
                        <GridItem key={c.id}>
                            <Card.Root>
                                <Card.Header>
                                    <HStack>
                                        <Heading>
                                            <BsFillMortarboardFill fill="#0891b2"/>
                                        </Heading>
                                        <Heading color={'cyan.700'}>
                                            {c.name}
                                        </Heading>
                                    </HStack>
                                </Card.Header>
                                <Card.Body>
                                    <VStack align="start">
                                        <Text color={'cyan.900'}>Serie: {c.grade}</Text>
                                        <Text color={'cyan.900'}>Total de alunos: 0</Text>
                                    </VStack>
                                </Card.Body>
                                <Card.Footer>
                                    <Button asChild size="sm" ms="auto" colorPalette={'cyan'}>
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