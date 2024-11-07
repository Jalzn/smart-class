"use client"

import { deleteClassroom } from "@/actions/classroom.action";
import { Button } from "@/components/ui/button";
import { DialogBackdrop, DialogBody, DialogContent, DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { Box, Heading, HStack } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteSalaDialog() {
    const params = useParams<{ id: string }>()
    const router = useRouter()

    const [open, setOpen] = useState(false)

    async function handleClick() {
        const res = await deleteClassroom(params.id)

        if (res.status === "OK") {
            setOpen(false)
            router.push('/minhas-salas')
            return
        }
    }

    return (
        <DialogRoot placement="center" open={open} onOpenChange={(s) => setOpen(s.open)}>
            <DialogBackdrop />
            <DialogTrigger asChild>
                <Button ms="auto" size="sm" colorPalette="red" bg="red.400">Excluir</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogBody>
                    <Box p={2}>
                        <Heading mb={4}>Tem certeza que deseja excluir essa sala?</Heading>
                        <HStack gap={4} justifyContent="center">
                            <Button colorPalette="gray" onClick={() => setOpen(false)}>Cancelar</Button>
                            <Button colorPalette="red" onClick={handleClick}>Excluir</Button>
                        </HStack>
                    </Box>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}