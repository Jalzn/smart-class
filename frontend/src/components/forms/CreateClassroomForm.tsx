"use client"

import { createListCollection, Input, VStack } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { SelectContent, SelectRoot, SelectLabel, SelectTrigger, SelectValueText, SelectItem } from "../ui/select";
import { createClassroomAction } from "@/actions/classroom.action";
import { useFormState } from "react-dom";
import { Alert } from "../ui/alert";
import { FormEvent, useState } from "react";

export default function CreateClassroomForm() {
    const [value, setValue] = useState<{ name: string, grade: string }>({
        name: "",
        grade: ""
    })

    const [state, action] = useFormState(createClassroomAction, {
        message: "",
        errors: {},
        status: "PENDING"
    })

    const grades = createListCollection({
        items: [
            { label: "Primeiro ano", value: 1 },
            { label: "Segundo ano", value: 2 },
            { label: "Terceiro ano", value: 3 },
        ]
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('name', value.name)
        formData.set('grade', value.grade)

        await action(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap={4} align="end">
                {state.message && (
                    <Alert colorPalette="red" title={state.message} />
                )}
                <Field label="Nome">
                    <Input placeholder="Digite o nome da turma" value={value.name} onChange={(e) => setValue({ ...value, name: e.target.value })} />
                </Field>
                <SelectRoot collection={grades} onValueChange={(e) => setValue({ ...value, grade: e.value[0] })}>
                    <SelectLabel>Série</SelectLabel>
                    <SelectTrigger>
                        <SelectValueText placeholder="Escolha a série da turma" />
                    </SelectTrigger>
                    <SelectContent portalled={false}>
                        {grades.items.map(grade => (
                            <SelectItem item={grade} key={grade.value}>
                                {grade.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                <Button colorPalette="teal" type="submit">Salvar</Button>
            </VStack>
        </form>
    )
}