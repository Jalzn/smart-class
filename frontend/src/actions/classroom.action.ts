"use server"

import { FormState } from "@/types";
import { revalidatePath } from "next/cache";

export async function createClassroomAction(state: FormState, formData: FormData): Promise<FormState> {
    const res = await fetch("http://localhost:3333/classrooms", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            grade: Number(formData.get('grade'))
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

    revalidatePath('/')

    return {
        message: "",
        errors: {},
        status: "OK"
    }
}