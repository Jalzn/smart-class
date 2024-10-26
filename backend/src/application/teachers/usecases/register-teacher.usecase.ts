import { Teacher, User } from '@/domain/entities'
import { ValidationError } from '@/domain/errors'
import { ITeacherRepository, IUserRepository } from '@/domain/repositories'
import { IHashService, IJwtService } from '@/domain/services'
import { validate } from 'class-validator'
import {
    IRegisterTeacherInputDTO,
    RegisterTeacherInputDTO,
} from '../dtos/regiser-teacher.dto'

type IRegisterTeacherOutputDTO = {
    token: string
}

export class RegisterTeacherUsecase {
    private teacherRepository: ITeacherRepository
    private userRepository: IUserRepository
    private jwtService: IJwtService
    private hashService: IHashService

    constructor(
        teacherRepository: ITeacherRepository,
        userRepository: IUserRepository,
        jwtService: IJwtService,
        hashService: IHashService
    ) {
        this.userRepository = userRepository
        this.teacherRepository = teacherRepository
        this.jwtService = jwtService
        this.hashService = hashService
    }

    async execute(
        data: IRegisterTeacherInputDTO
    ): Promise<IRegisterTeacherOutputDTO> {
        const dto = new RegisterTeacherInputDTO(data)

        const errors = await validate(dto)

        if (errors.length > 0) {
            console.log(errors)
            throw new ValidationError()
        }

        const hashedPassword = this.hashService.hash(dto.password)

        const user = User.create(dto.email, hashedPassword)
        const teacher = Teacher.create(dto.name)

        teacher.user = user

        await this.userRepository.create(user)
        await this.teacherRepository.create(teacher)

        const token = this.jwtService.encode({
            id: user.id,
            email: user.email,
        })

        return { token }
    }
}
