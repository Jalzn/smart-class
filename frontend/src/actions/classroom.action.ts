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

export async function alocarProfessorMateriaAction(state: FormState, formData: FormData): Promise<FormState> {
    const classroomId = formData.get('classroomId')

    const res = await fetch(`http://localhost:3333/classrooms/${classroomId}/assign-teacher`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teacherId: formData.get('teacherId'),
            subjectCode: formData.get('subjectCode'),
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

export async function deleteClassroom(classroomId: string): Promise<FormState> {
    const res = await fetch(`http://localhost:3333/classrooms/${classroomId}`, {
        method: "DELETE"
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

export async function generateHorarios() {
    const res = await fetch('http://localhost:3333/classrooms/generate-horarios', {
        method: "POST"
    })

    if (!res.ok) {
        throw new Error("Failed to generate horarios")
    }

    revalidatePath('/')
}