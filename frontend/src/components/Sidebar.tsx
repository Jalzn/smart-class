"use client"

import { Button, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname()

    const getVariant = (link: string) => {
        if (link === pathname) {
            return 'subtle'
        }

        return 'ghost'
    }

    const getPallete = (link: string) => {
        if (link === pathname) {
            return "blue"
        }

        return "gray"
    }

    return (
        <VStack position="fixed" top={16} left={0} w={64} h="vh" p={4} borderWidth="1px" borderColor="gray.300" background="white">
            <Button asChild variant={getVariant('/')} w="full" colorPalette={getPallete('/')}>
                <Link href="/">
                    <Text fontWeight="bold">Inicio</Text>
                </Link>
            </Button>
            <Button asChild variant={getVariant('/minhas-salas')} w="full" colorPalette={getPallete('/minhas-salas')}>
                <Link href="/minhas-salas">
                    <Text fontWeight="bold">Minhas Salas</Text>
                </Link>
            </Button>
            <Button asChild variant={getVariant('/professores')} w="full" colorPalette={getPallete('/professores')}>
                <Link href="/professores">
                    <Text fontWeight="bold">Professores</Text>
                </Link>
            </Button>
        </VStack>
    )
}