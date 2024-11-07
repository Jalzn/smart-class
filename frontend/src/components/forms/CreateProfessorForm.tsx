"use client"

import { registerTeacherAction } from "@/actions/teacher.action"
import { Badge, Box, createListCollection, Flex, HStack, Input, SelectItem, Text, VStack } from "@chakra-ui/react"
import { useFormState } from "react-dom"
import { Alert } from "../ui/alert"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { FormEvent, useState } from "react"
import { SelectContent, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select"
import { Avatar } from "../ui/avatar"
import { FormState } from "@/types"

type FormValue = {
    name: string,
    subjectCodes: string[],
    email:string,
    phone:string
}

export default function CreateProfessorForm({ onSuccess }: { onSuccess: () => void }) {
    const [value, setValue] = useState<FormValue>({
        name: "",
        subjectCodes: [],
        email:"",
        phone:""
    })

    const [subject, setSuject] = useState("")

    const [state, setState] = useState<FormState>({
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
        formData.set('email', value.email)
        formData.set('phone', value.phone)
        formData.set('subjectCodes', JSON.stringify(value.subjectCodes))

        const { message, errors, status } = await registerTeacherAction(state, formData)

        if (status == "OK") {
            onSuccess()
        }
        else {
            setState({ message, errors, status })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap={4} align="end">
                {state.message && (
                    <Alert colorPalette="red" title={state.message} />
                )}
                <HStack w="full" gap={8}>
                    <Avatar size="xl" />
                    <Field label="Nome">
                        <Input placeholder="Digite o nome do professor" name="name" onChange={(e) => setValue({ ...value, name: e.target.value })} />
                    </Field>                    
                </HStack>
                <HStack w="full" gap={8}>
                    <Field label="E-mail">
                        <Input placeholder="Digite o e-mail do professor" name="email" onChange={(e) => setValue({ ...value, email: e.target.value })} />
                    </Field>
                </HStack>
                <HStack w="full" gap={8}>
                    <Field label="Telefone">
                        <Input placeholder="Digite o telefone do professor" name="phone" onChange={(e) => setValue({ ...value, phone: e.target.value })} />
                    </Field>
                </HStack>
                <Flex align="start" w="full" direction="column">

                    <Text mb={2} fontSize="lg">Materias</Text>
                    <HStack>
                        {value.subjectCodes.map((s, index) => (
                            <Badge colorPalette="blue" key={index}>{subjects.items.find(i => i.value === s)?.label}</Badge>
                        ))}
                    </HStack>
                </Flex>
                <HStack align="stretch" w="full">
                    <SelectRoot
                        collection={subjects}
                        onValueChange={(e) => setSuject(e.value[0])}
                    >
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
                    <Button colorPalette="cyan" onClick={() => {
                        if (subject) {
                            setValue({ ...value, subjectCodes: [...value.subjectCodes, subject] })
                        }
                    }}>Adicionar</Button>
                </HStack>
                <Button colorPalette="teal" type="submit">Salvar</Button>
            </VStack>
        </form>
    )
}