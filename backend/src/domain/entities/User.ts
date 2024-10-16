import { ValidationError } from '../errors'

interface IUserProps {
    id: string
    email: string
    password: string
}

export default class User implements IUserProps {
    public id: string
    public email: string
    public password: string

    private constructor(props: IUserProps) {
        this.id = props.id
        this.email = props.email
        this.password = props.password
    }

    public static create(email: string, password: string) {
        User.validateEmail(email)

        return new User({
            id: crypto.randomUUID().toString(),
            email: email,
            password: password,
        })
    }

    public static with({ id, email, password }: IUserProps) {
        User.validateEmail(email)

        return new User({
            id,
            email,
            password,
        })
    }

    private static validateEmail(email: string) {
        const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

        const isValid = EMAIL_REGEX.test(email)

        if (!isValid) {
            throw new ValidationError('Email invalido.')
        }
    }
}
