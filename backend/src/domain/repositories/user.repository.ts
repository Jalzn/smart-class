import { User } from '../entities'

export interface IUserRepository {
    findAll: () => Promise<User[]>
    findById: (id: string) => Promise<User>
    create: (user: User) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
