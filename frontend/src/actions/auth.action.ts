"use server"

import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type LoginFormState = {
    message: string
    errors: Record<string, string>
}

export type RegisterFormState = {
    message: string
    errors: Record<string, string>
}

export async function loginAction(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const res = await fetch('http://localhost:3334/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.get('email') as string,
            password: formData.get('password') as string
        })
    })

    if (!res.ok) {
        const { message } = await res.json()

        return {
            message,
            errors: {}
        }
    }

    const { token } = await res.json()

    const user = jwt.decode(token)

    if (!user) {
        throw new Error("Failed to decode token")
    }

    cookies().set('token', token, { httpOnly: true })
    cookies().set('user', JSON.stringify(user), { httpOnly: true })

    redirect('/')
}

export async function registerAction(state: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
    const res = await fetch('http://localhost:3334/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        })
    })

    if (!res.ok) {
        const { message } = await res.json()

        return {
            message,
            errors: {}
        }
    }

    const { token } = await res.json()

    const user = jwt.decode(token)

    if (!user) {
        throw new Error('Failed to decode token')
    }

    cookies().set('token', token, { httpOnly: true })
    cookies().set('user', JSON.stringify(user), { httpOnly: true })

    redirect('/')

}

export async function logouAction() {
    cookies().delete('token')
    cookies().delete('user')

    redirect('/auth/login')
}