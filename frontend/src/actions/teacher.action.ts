"use server"

import { FormState } from "@/types";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/utils";

export async function registerTeacherAction(formState: FormState, formData: FormData): Promise<FormState> {
    const res = await fetch(API_URL + "/teachers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            subjectCodes: JSON.parse(formData.get('subjectCodes') as string ?? "[]")
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

export async function deleteTeacherAction(teacherId: string) {
    const res = await fetch(API_URL + `/teachers/${teacherId}`, {
        method: "DELETE",
    })

    if (!res.ok) {
        throw new Error("Failed to delete teacher")
    }

    revalidatePath('/')
}