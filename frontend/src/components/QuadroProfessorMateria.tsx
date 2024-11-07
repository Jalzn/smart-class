import { Box, Grid, GridItem, Heading, HStack, Text } from "@chakra-ui/react"
import AlocarProfessorDialog from "./dialogs/AlocarProfessorDialong"
import { API_URL } from "@/utils"

type ProfessorMateria = [
    {
        id: string
        name: string
    } | null,
    {
        code: string
        name: string
    }
]

export default async function ({ quadroProfessorMateria }: { quadroProfessorMateria: ProfessorMateria[] }) {
    quadroProfessorMateria.sort((q1, q2) => {
        if (q1[1].name < q2[1].name) return -1
        if (q1[1].name > q2[1].name) return 1
        return 0
    })

    const professores = await fetchProfessor()

    async function fetchProfessor() {
        const res = await fetch( API_URL + '/teachers')

        if (res.ok) {
            const { teachers } = await res.json()
            return teachers
        }

        return []
    }

    return (
        <>
            <Heading mb={4} color={'cyan.600'}>Quadro de Materias</Heading>
            <Box bg="white" border="sm" borderColor="gray.200" p={4}>
                {quadroProfessorMateria.length === 0
                    ? (

                        <Text>Nao possui nenhuma materia</Text>
                    )
                    : (
                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                            {
                                quadroProfessorMateria.map(professorMateria => {
                                    const [professor, materia] = professorMateria

                                    return (
                                        <GridItem key={materia.code}>
                                            <HStack p={4}>
                                                <Text>{materia.name}</Text>
                                                {professor
                                                    ? <Text ms="auto">{professor.name}</Text>
                                                    : <AlocarProfessorDialog materia={materia} professores={professores} />}
                                            </HStack>
                                        </GridItem>
                                    )
                                })
                            }
                        </Grid>
                    )
                }
            </Box>
        </>
    )
}