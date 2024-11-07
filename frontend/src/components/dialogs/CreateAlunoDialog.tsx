"use client"

import { Button } from "@/components/ui/button";
import { DialogBackdrop, DialogBody, DialogContent, DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import CreateAlunoForm from "../forms/CreateAlunoForm";

export default function CreateAlunoDialog({ onClose }: { onClose: () => void }) {
    const [open, setOpen] = useState(false)

    return (
        <DialogRoot placement="center" open={open} onOpenChange={(s) => setOpen(s.open)}>
            <DialogBackdrop />
            <DialogTrigger asChild>
                <Button ms="auto" size="sm" colorPalette="teal">Novo Aluno</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogBody>
                    <Box p={2}>
                        <Heading mb={4}>Novo Aluno</Heading>
                        <CreateAlunoForm onSuccess={() => {setOpen(false); onClose()}} />
                    </Box>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}