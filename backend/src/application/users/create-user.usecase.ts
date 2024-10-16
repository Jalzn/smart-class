import { User } from '@/domain/entities'
import { IUserRepository } from '@/domain/repositories'
import { IHashService } from '@/domain/services'

export type ICreateUserInputDTO = {
    email: string
    password: string
}

export type ICreateUserOutputDTO = {
    user: User
}

export class CreateUserUsecase {
    private userRepository: IUserRepository
    private hashService: IHashService

    constructor(userRepository: IUserRepository, hashService: IHashService) {
        this.userRepository = userRepository
        this.hashService = hashService
    }

    async execute({
        email,
        password,
    }: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
        const hashedPassword = this.hashService.hash(password)

        const user = User.create(email, hashedPassword)

        await this.userRepository.create(user)

        return { user }
    }
}
