type IStudentProps = {
    id: string
}

export default class Student {
    public id: string

    private constructor({ id }: IStudentProps) {
        this.id = id
    }

    public static create() {
        return new Student({
            id: crypto.randomUUID().toString(),
        })
    }

    public static with(props: IStudentProps) {
        return new Student(props)
    }
}
