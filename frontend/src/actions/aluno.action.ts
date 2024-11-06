"use server"

import { FormState } from "@/types";
import { revalidatePath } from "next/cache";

export async function createAlunoAction(formState: FormState, formData: FormData): Promise<FormState> {
    const res = await fetch('http://127.0.0.1:3333/students', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name')
        })
    })

    if (!res.ok) {
        const { message } = await res.json()

        return {
            message,
            errors: {},
            status: "FAILED"
        }
    }

    revalidatePath("/")

    return {
        message: "",
        errors: {},
        status: "OK"
    }
}