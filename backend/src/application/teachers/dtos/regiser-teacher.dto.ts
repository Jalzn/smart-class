import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export type IRegisterTeacherInputDTO = {
    email: string
    password: string
    name: string
}

export class RegisterTeacherInputDTO implements IRegisterTeacherInputDTO {
    @IsEmail()
    @IsString()
    public email: string

    @MinLength(8)
    @MaxLength(16)
    @IsString()
    public password: string

    @IsString()
    public name: string

    constructor(dto: IRegisterTeacherInputDTO) {
        this.email = dto.email
        this.password = dto.password
        this.name = dto.name
    }
}
