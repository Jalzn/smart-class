'use client'

import { FormState } from "@/types"
import { Box, HStack, Input, VStack } from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import { Alert } from "../ui/alert"
import { Avatar } from "../ui/avatar"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { createAlunoAction } from "@/actions/aluno.action"

type Props = {
    onSuccess: () => void
}

type FormValue = {
    name: string,
    email:string,
    phone:string
}

export default function CreateAlunoForm({ onSuccess }: Props) {
    const [state, setState] = useState<FormState>({
        message: "",
        errors: {},
        status: "PENDING"
    })

    const [value, setValue] = useState<FormValue>({
        name: "",
        email:"",
        phone:""
    })

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData()

        formData.set('name', value.name)
        formData.set('email', value.email)
        formData.set('phone', value.phone)

        const res = await createAlunoAction(state, formData)

        if (res.status === "OK") {
            onSuccess()
            return
        }

        setState(res)
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack gap={4}>
                {state.message && (
                    <Alert colorPalette="red" title={state.message} />
                )}
                <HStack w="full" gap={8}>
                    <Avatar size="xl" />
                    <Field label="Nome">
                        <Input placeholder="Digite o nome do aluno" onChange={(e) => setValue({ ...value, name: e.target.value })} />
                    </Field>
                </HStack>
                <HStack w="full" gap={8}>                    
                    <Field label="E-mail">
                        <Input placeholder="Digite o e-mail do aluno" onChange={(e) => setValue({ ...value, email: e.target.value })} />
                    </Field>
                </HStack>
                <HStack w="full" gap={8}>                    
                    <Field label="Telefone">
                        <Input placeholder="Digite o celular do aluno" onChange={(e) => setValue({ ...value, phone: e.target.value })} />
                    </Field>
                </HStack>
                <Button ms="auto" colorPalette="teal" type="submit">Salvar</Button>
            </VStack>
        </form>
    )
}