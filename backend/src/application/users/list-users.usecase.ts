import { User } from '@/domain/entities'
import { IUserRepository } from '@/domain/repositories'

export type ListUsersOutputDTO = {
    users: User[]
}

export class ListUsersUsecase {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(): Promise<ListUsersOutputDTO> {
        const users = await this.userRepository.findAll()

        return { users }
    }
}
