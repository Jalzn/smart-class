import { User } from '@/domain/entities'
import { NotFoundError } from '@/domain/errors/NotFoundError'
import { IUserRepository } from '@/domain/repositories'
import { PrismaClient } from '@prisma/client'

export class UserRepository implements IUserRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }

    public async findAll(): Promise<User[]> {
        const users: User[] = []

        const response = await this.client.user.findMany()

        response.forEach((row) => {
            users.push(User.with(row))
        })

        return users
    }

    public async findById(id: string): Promise<User> {
        const row = await this.client.user.findUnique({
            where: { id },
        })

        if (!row) {
            throw new NotFoundError('User not found.')
        }

        return User.with(row)
    }

    public async findByEmail(email: string): Promise<User> {
        const row = await this.client.user.findUnique({
            where: { email },
        })

        if (!row) {
            throw new NotFoundError('User not found.')
        }

        return User.with(row)
    }

    public async create(user: User): Promise<void> {
        await this.client.user.create({
            data: {
                id: user.id,
                email: user.email,
                password: user.password,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })
    }

    public async deleteById(id: string): Promise<void> {
        const user = await this.client.user.findFirst({
            where: { id },
        })

        if (!user) {
            throw new NotFoundError('User not foud.')
        }

        await this.client.user.delete({
            where: { id },
        })
    }
}
