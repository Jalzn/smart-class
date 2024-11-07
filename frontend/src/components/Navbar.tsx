import Logo from '@/assets/light-logo.svg'
import { Flex, Text } from "@chakra-ui/react";
import { cookies } from "next/headers";
import Image from 'next/image';
import { Avatar } from './ui/avatar';
import { NavbarMenu } from './NavbarMenu';

const getUserFromCookies = () => {
    const cookie = cookies().get('user')

    if (!cookie) {
        throw new Error("Cookie not found.")
    }

    const user = JSON.parse(cookie.value)

    return user
}

export default function Navbar() {
    const user = getUserFromCookies()

    return (
        <Flex shadow="md" p={4} h={16} alignItems="center" background="blue.100" color="white">
            <Flex gap={2}>
                <Image alt='Logo' src={Logo} width={180} height={32} />
                
            </Flex>
            <Flex ms="auto" alignItems="center" gap={4}>
                <Avatar color="white" bg="cyan.900" />
                <Text color="cyan.900">{user.email}</Text>
                <NavbarMenu />
            </Flex>
        </Flex>
    )
}