import { Box, Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

export function HeaderPage({ children }: { children: ReactNode }) {
    return (
        <Flex alignItems="center" background="cyan.600" px={8} py={16} mb={12}>
            {children}
        </Flex>
    )
}

export function HeaderPageTitle({ children }: { children: ReactNode }) {
    return <Heading fontSize="3xl" color="gray.800">{children}</Heading>
}

export function HeaderPageRight({ children }: { children: ReactNode }) {
    return (
        <Box ms="auto">
            {children}
        </Box>
    )
}