'use client'

import { Flex, Input, Text, VStack } from '@chakra-ui/react'
import Logo from '@/assets/logo.png'
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { loginAction } from '@/actions/auth.action';
import { Alert } from '../ui/alert';

export default function LoginForm() {
    const [state, formAction] = useFormState(loginAction, {
        message: "",
        errors: {}
    })

    return (
        < form action={formAction} >
            <VStack w="80" align="stretch" gap={6}>
                <Flex justifyContent="center">
                    <Image alt="Logo" src={Logo} width={42} height={42} />
                    <Text ms={2} fontSize="3xl" color="gray.600">SmartClass</Text>
                </Flex>
                {state.message && (
                    <Alert colorPalette="red" title={state.message} />
                )}
                <Input name="email" placeholder="Email" />
                <Input name="password" type="password" placeholder="Senha" />
                <Button colorPalette="green" type="submit">Login</Button>
            </VStack>
        </form >
    )
}