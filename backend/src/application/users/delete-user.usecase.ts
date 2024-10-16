import { IUserRepository } from '@/domain/repositories'

export type DeleteUserInputDTO = {
    id: string
}

export class DeleteUserUsecase {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute({ id }: DeleteUserInputDTO): Promise<void> {
        await this.userRepository.deleteById(id)
    }
}
