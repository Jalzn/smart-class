import LoginForm from "@/components/forms/LoginForm";
import { Center, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
    return (
        <Center w="vw" h="vh" flexDirection="column" gap={8}>
            <LoginForm />
            <Link href="/auth/register">
                <Text fontSize="sm" color="gray.500">
                    Ainda nao sou membro
                </Text>
            </Link>
        </Center>
    );
}
