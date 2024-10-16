import { User } from '@/domain/entities'
import { IUserRepository } from '@/domain/repositories'

export type FindUserInputDTO = {
    id: string
}

export type FindUserOutputDTO = {
    user: User
}

export class FindUserUsecase {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute({ id }: FindUserInputDTO): Promise<FindUserOutputDTO> {
        const user = await this.userRepository.findById(id)

        return { user }
    }
}
