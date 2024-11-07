'use client'
import CreateAlunoDialog from "@/components/dialogs/CreateAlunoDialog";
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage";
import { EmptyState } from "@/components/ui/empty-state";
import { Box, Container, Flex, IconButton, Table } from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import { BiSolidInbox, BiTrash } from "react-icons/bi";
import { API_URL } from "@/utils";
import { useEffect, useState } from "react";

export default function AlunosPage() {

    const [alunos, setAlunos] = useState([{ id: '', name: '', subjects: [] }])
    const [close, setClose] = useState(true)

    useEffect(() => {
        fetchAlunos().then((data) => {
            setAlunos(data)
        });
    }, [close]);

    async function fetchAlunos() {
        const res = await fetch(API_URL + '/students', { mode: 'cors' })

        if (res.ok) {
            const { students } = await res.json()
            return students
        }

        return []
    }

    return (
        <>
            <HeaderPage>
                <HeaderPageTitle>Alunos</HeaderPageTitle>
            </HeaderPage>

            <Container>
                <Flex mb={4}>
                    <CreateAlunoDialog onClose={() => setClose(false)} />
                </Flex>
                <Box p={4} rounded="md" border="sm" borderColor="gray.200" background="white">
                    {alunos.length === 0
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
                                        <Table.ColumnHeader>Ações</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {alunos.map(a => (
                                        <Table.Row key={a.id}>
                                            <Table.Cell>{a.name}</Table.Cell>
                                            <Table.Cell>
                                                <IconButton variant="ghost" size="sm" type="submit">
                                                    <BiTrash color="red" />
                                                </IconButton>
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