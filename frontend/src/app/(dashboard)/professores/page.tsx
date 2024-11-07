'use client'
import { deleteTeacherAction } from "@/actions/teacher.action";
import CreateProfessorDialog from "@/components/dialogs/CreateProfessorDialog";
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge, Box, Container, Flex, HStack, IconButton, Table } from "@chakra-ui/react";
import { BiSolidInbox, BiTrash } from "react-icons/bi";
import { API_URL } from "@/utils";
import { useEffect, useState } from "react";


export default function ProfessoresPage() {

    
    const [professores, setProfessores] = useState([{id:'', name:'', subjects:[]}])
    const [close, setClose] = useState(true)   

    useEffect(()=>{
        fetchProfessores().then((data)=>{
            setProfessores(data)
        });
    },[close]);

    async function fetchProfessores() {
        const res = await fetch(API_URL + '/teachers', {mode:'cors'})       

        if (res.ok) {
            const { teachers } = await res.json()
            return teachers
        }

        return []
    }

    return (
        <>
            <HeaderPage>
                <HeaderPageTitle>Professores</HeaderPageTitle>
            </HeaderPage>
            <Container>
                <Flex mb={4}>
                    <CreateProfessorDialog onClose={() => setClose(false)}/>
                </Flex>
                <Box p={4} rounded="md" border="sm" borderColor="gray.200" background="white">
                    {professores.length === 0
                        ? (
                            <EmptyState
                                icon={<BiSolidInbox />}
                                title="Voce ainda nao possui professores"
                            />
                        )
                        : (
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>Nome</Table.ColumnHeader>
                                        <Table.ColumnHeader>Especialidades</Table.ColumnHeader>
                                        <Table.ColumnHeader>Ações</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {professores.map(p => (
                                        <Table.Row key={p.id + p.name}>
                                            <Table.Cell>{p.name}</Table.Cell>
                                            <Table.Cell>
                                                <HStack>
                                                    {p.subjects.map((s: any) => (
                                                        <Badge colorPalette="blue" key={s.id + s.name}>{s.name}</Badge>
                                                    ))}
                                                </HStack>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <form action={deleteTeacherAction.bind(null, p.id)}>
                                                    <IconButton variant="ghost" size="sm" type="submit">
                                                        <BiTrash color="red" />
                                                    </IconButton>
                                                </form>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        )}
                </Box>
            </Container >
        </>
    )
}