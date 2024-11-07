"use server"

import { FormState } from "@/types";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/utils";

export async function createAlunoAction(formState: FormState, formData: FormData): Promise<FormState> {
    const res = await fetch(API_URL + '/students', {
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

export async function deleteStudentAction(studentId: string) {
    const res = await fetch(API_URL + `/students/${studentId}`, {
        method: "DELETE",
    })

    if (!res.ok) {
        throw new Error("Failed to delete student")
    }

    revalidatePath('/')
}