import { IsEmail, IsString, IsStrongPassword } from 'class-validator'

export type IRegisterTeacherInputDTO = {
    email: string
    password: string
    name: string
}

export class RegisterTeacherInputDTO implements IRegisterTeacherInputDTO {
    @IsEmail()
    @IsString()
    public email: string

    @IsStrongPassword()
    @IsString()
    public password: string

    @IsString()
    public name: string

    constructor(dto: IRegisterTeacherInputDTO) {
        this.email = dto.email
        this.password = dto.password
        this.name = dto.password
    }
}
