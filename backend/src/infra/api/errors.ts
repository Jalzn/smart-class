export class ApiError extends Error {
    public message: string
    public status: number

    constructor(message?: string, status?: number) {
        super(message)

        this.message = message ?? 'An unexpected error occurred.'
        this.status = status ?? 500
    }
}
