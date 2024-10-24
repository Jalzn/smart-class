import { UnauthorizedError, ValidationError} from "@/domain/errors";
import { IUserRepository } from "@/domain/repositories";
import { IHashService, IJwtService } from "@/domain/services";

type ILoginInputDTO = {
    email: string
    password: string
}

type ILoginOutputDTO = {
    token: string
}

export class LoginUsecase {
    private userRepository: IUserRepository
    private jwtService: IJwtService
    private hashService: IHashService

    constructor(userRepository: IUserRepository, jwtService: IJwtService, hashService: IHashService) {
        this.userRepository = userRepository
        this.jwtService = jwtService
        this.hashService = hashService
    }

    async execute({email, password}: ILoginInputDTO): Promise<ILoginOutputDTO> {
        if(!email) {
            throw new ValidationError("Email is missing.")
        }

        if(!password) {
            throw new ValidationError("Password is missing.")
        }

        const user = await this.userRepository.findByEmail(email)

        const matchPassword = this.hashService.compare(password, user.password)

        if(!matchPassword) {
            throw new UnauthorizedError()
        }

        const token = this.jwtService.encode({
            id: user.id,
            email: user.email
        })

        return {token}
    }
}