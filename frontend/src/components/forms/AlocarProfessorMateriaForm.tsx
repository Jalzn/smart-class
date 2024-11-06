"use client"

import { createListCollection, Heading, Input, VStack } from "@chakra-ui/react"
import { Button } from "../ui/button"
import { FormEvent, useState } from "react"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select"
import { alocarProfessorMateriaAction } from "@/actions/classroom.action"
import { FormState } from "@/types"
import { useParams } from "next/navigation"
import { Alert } from "../ui/alert"


export default function AlocarProfessorMateriaForm({
    materia,
    professores,
    onSuccess
}: {
    materia: any
    professores: any[],
    onSuccess: () => void
}) {
    const params = useParams<{ id: string }>()

    const [state, setState] = useState<FormState>({
        message: "",
        errors: {},
        status: "PENDING"
    })

    const [selectedProfessor, setSelectedProfessor] = useState("")

    const collection = createListCollection({
        items: professores.map(p => ({ value: p.id, label: p.name }))
    })


    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData()

        formData.set('classroomId', params.id)
        formData.set('teacherId', selectedProfessor)
        formData.set('subjectCode', materia.code)

        const res = await alocarProfessorMateriaAction(state, formData)

        setState(res)

        if (res.status === "OK") {
            onSuccess()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap={4} align="stretch">
                <Heading>Alocar Professor</Heading>
                {state.message && (
                    <Alert colorPalette="red" title={state.message} />
                )}
                <SelectRoot
                    collection={collection}
                    onValueChange={(e) => setSelectedProfessor(e.value[0])}
                >
                    <SelectTrigger>
                        <SelectValueText placeholder="Escolha o professor responsavel pela matéria" />
                    </SelectTrigger>
                    <SelectContent portalled={false}>
                        {collection.items.map(p => (
                            <SelectItem item={p} key={p.value}>
                                {p.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                <Button type="submit" colorPalette="cyan">Salvar</Button>
            </VStack>
        </form>
    )
}