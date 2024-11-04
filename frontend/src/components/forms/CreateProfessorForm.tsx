"use client"

import { registerTeacherAction } from "@/actions/teacher.action"
import { Badge, Box, createListCollection, Flex, HStack, Input, SelectItem, Text, VStack } from "@chakra-ui/react"
import { useFormState } from "react-dom"
import { Alert } from "../ui/alert"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { FormEvent, useState } from "react"
import { SelectContent, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select"

type FormValue = {
    name: string,
    subjectCodes: string[]
}

export default function CreateProfessorForm({ onSuccess }: { onSuccess: () => void }) {
    const [value, setValue] = useState<FormValue>({
        name: "",
        subjectCodes: []
    })

    const [state, action] = useFormState(registerTeacherAction, {
        message: "",
        errors: {},
        status: "PENDING"
    })

    const subjects = createListCollection({
        items: [
            { value: "PORT", label: "Lingua Portugues" },
            { value: "ENGL", label: "Lingua Ingles" },
            { value: "ART", label: "Artes" },
            { value: "EDF", label: "Educacao Fisica" },
            { value: "MAT", label: "Matematica" },
            { value: "HIS", label: "Historia" },
            { value: "GEO", label: "Geografia" },
            { value: "SOC", label: "Sociologia" },
            { value: "FIL", label: "Filosofia" },
            { value: "FIS", label: "Fisica" },
            { value: "QUI", label: "Quimica" },
            { value: "BIO", label: "Biologia" },
        ]
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('name', value.name)
        formData.set('subjectCodes', JSON.stringify(value.subjectCodes))

        try {
            await action(formData)
            onSuccess()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap={4} align="end">
                {state.message && (
                    <Alert colorPalette="red" title={state.message} />
                )}
                <Field label="Nome">
                    <Input placeholder="Digite o nome do professor" name="name" onChange={(e) => setValue({ ...value, name: e.target.value })} />
                </Field>
                <Flex align="start" w="full" direction="column">

                    <Text mb={2}>Materias</Text>
                    <HStack>
                        {value.subjectCodes.map(s => (
                            <Badge colorPalette="blue">{subjects.items.find(i => i.value === s)?.label}</Badge>
                        ))}
                    </HStack>
                </Flex>
                <SelectRoot
                    collection={subjects}
                    onValueChange={(e) => setValue({ ...value, subjectCodes: [...value.subjectCodes, e.value[0]] })}
                >
                    <SelectLabel>Adicionar matéria</SelectLabel>
                    <SelectTrigger>
                        <SelectValueText placeholder="Escolha a matéria responsavel pelo professor" />
                    </SelectTrigger>
                    <SelectContent portalled={false}>
                        {subjects.items.map(subject => (
                            <SelectItem item={subject} key={subject.value}>
                                {subject.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                <Button colorPalette="teal" type="submit">Salvar</Button>
            </VStack>
        </form>
    )
}