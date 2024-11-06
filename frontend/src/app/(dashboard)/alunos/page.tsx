import CreateAlunoDialog from "@/components/dialogs/CreateAlunoDialog";
import { HeaderPage, HeaderPageTitle } from "@/components/HeaderPage";
import { EmptyState } from "@/components/ui/empty-state";
import { Box, Container, Flex, IconButton, Table } from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import { BiSolidInbox, BiTrash } from "react-icons/bi";

export default async function () {
    revalidatePath('/')

    const alunos: any[] = await fetchAlunos()

    async function fetchAlunos() {
        const res = await fetch('http://127.0.0.1:3333/students')

        if (res.ok) {
            const { students } = await res.json()
            console.log(students)
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
                    <CreateAlunoDialog />
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
                                        <Table.ColumnHeader>Acoes</Table.ColumnHeader>
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