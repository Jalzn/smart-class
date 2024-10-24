type ITeacherProps = {
    id: string
    name: string
}

export default class Teacher {
    public id: string
    public name: string

    private constructor({ id, name }: ITeacherProps) {
        this.id = id
        this.name = name
    }

    public static create(name: string) {
        return new Teacher({
            id: crypto.randomUUID().toString(),
            name: name,
        })
    }

    public static with(props: ITeacherProps) {
        return new Teacher(props)
    }
}
