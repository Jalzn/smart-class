import { User } from '@/domain/entities'
import { AlreadyExistsError, UnauthorizedError, ValidationError } from '@/domain/errors'
import { IUserRepository } from '@/domain/repositories'
import { IHashService, IJwtService } from '@/domain/services'

type IRegisterInputDTO = {
    email: string
    password: string
}

type IRegisterOutputDTO = {
    token: string
}

export class RegisterUsecase {
    private userRepository: IUserRepository
    private jwtService: IJwtService
    private hashService: IHashService

    constructor(
        userRepository: IUserRepository,
        jwtService: IJwtService,
        hashService: IHashService
    ) {
        this.userRepository = userRepository
        this.jwtService = jwtService
        this.hashService = hashService
    }

    async execute({ email, password }: IRegisterInputDTO): Promise<IRegisterOutputDTO> {
        if (!email) {
            throw new ValidationError('Email is missing.')
        }

        if (!password) {
            throw new ValidationError('Password is missing.')
        }

        const user = User.create(email, this.hashService.hash(password))

        await this.userRepository.create(user)

        const token = this.jwtService.encode({
            id: user.id,
            email: user.email
        })

        return { token }
    }
}