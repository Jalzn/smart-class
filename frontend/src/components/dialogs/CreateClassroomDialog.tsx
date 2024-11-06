"use client"

import { Box, Heading } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { DialogBackdrop, DialogBody, DialogContent, DialogRoot, DialogTrigger } from "../ui/dialog";
import CreateClassroomForm from "../forms/CreateClassroomForm";
import { useState } from "react";

export default function CreateClassroomDialog() {
    const [open, setOpen] = useState(false)

    return (
        <DialogRoot placement="center" open={open} onOpenChange={(s) => setOpen(s.open)}>
            <DialogBackdrop />
            <DialogTrigger asChild>
                <Button ms="auto" colorPalette="teal" size="sm">Nova Sala</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogBody>
                    <Box p={4}>
                        <Heading mb={4}>Nova Sala</Heading>
                        <CreateClassroomForm onSuccess={() => setOpen(false)} />
                    </Box>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    )
}