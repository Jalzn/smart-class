'use client'

import { Input, VStack } from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import { useFormState } from 'react-dom';
import { Alert } from '../ui/alert';
import { registerAction } from '@/actions/auth.action';

export default function RegisterForm() {
    const [state, formAction] = useFormState(registerAction, {
        message: "",
        errors: {}
    })

    return (
        < form action={formAction} >
            <VStack w="80" align="stretch" gap={6}>
                {state.message && (
                    <Alert colorPalette="red" title={state.message} />
                )}
                <Input name="email" placeholder="Email" />
                <Input name="password" type="password" placeholder="Senha" />
                <Button colorPalette="cyan" type="submit">Cadastrar</Button>
            </VStack>
        </form >
    )
}