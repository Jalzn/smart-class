"use client"

import Logo from '@/assets/light-logo.svg'
import RegisterForm from '@/components/forms/RegisterForm';
import { Button } from "@/components/ui/button";
import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

type RegisterType =
    | "principal"
    | "teacher"
    | "student";

export default function RegisterPage() {
    const [registerType, setRegisterType] = useState<RegisterType | null>(null)

    return (
        <Center w="vw" h="vh" flexDirection="column" gap={8}>
            <Flex justifyContent="center" mb={4}>
                <Image alt="Logo" src={Logo} width={280} height={42} />                
            </Flex>
            {!registerType && (
                <VStack spaceY={4} w={80} align="stretch">
                    <Button colorPalette="cyan" onClick={() => setRegisterType("principal")}>Sou Diretor</Button>
                    <Button colorPalette="cyan" onClick={() => setRegisterType("teacher")}>Sou Professor</Button>
                    <Button colorPalette="cyan" onClick={() => setRegisterType("student")}>Sou Aluno</Button>
                </VStack>
            )}
            {registerType === "principal" && (
                <RegisterForm />
            )}
            {registerType === "teacher" && (
                <Text>Not supported</Text>
            )}
            {registerType === "student" && (
                <Text>Not supported</Text>
            )}
            <Link href="/auth/login">
                <Text fontSize={16} color="gray.500">
                    Já sou membro
                </Text>
            </Link>
        </Center>
    )
}