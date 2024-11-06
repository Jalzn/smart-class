"use client"

import { Button } from "@/components/ui/button";
import { DialogBackdrop, DialogBody, DialogContent, DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import AlocarProfessorMateriaForm from "../forms/AlocarProfessorMateriaForm";

export default function AlocarProfessorDialog(
    {
        materia,
        professores
    }:
        {
            materia: any,
            professores: any[]
        }
) {
    const [open, setOpen] = useState(false)

    return (
        <DialogRoot placement="center" open={open} onOpenChange={(s) => setOpen(s.open)}>
            <DialogBackdrop />
            <DialogTrigger asChild>
                <Button ms="auto" size="sm" colorPalette="cyan">Alocar Professor</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogBody>
                    <Box p={2}>
                        <AlocarProfessorMateriaForm materia={materia} professores={professores} onSuccess={() => setOpen(false)} />
                    </Box>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}