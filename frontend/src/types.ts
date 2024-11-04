export type FormState = {
    message: String,
    errors: Record<string, string>
    status: "OK" | "FAILED" | "PENDING"
}