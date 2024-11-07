type IStudentProps = {
    id: string
    name: string
}


export default class Student {
    public id: string
    public name: string

    private constructor({ id, name }: IStudentProps) {
        this.id = id
        this.name = name
    }

    public static create(name: string) {
        return new Student({
            id: crypto.randomUUID().toString(),
            name
        })
    }

    public static with(props: IStudentProps) {
        return new Student(props)
    }
}
