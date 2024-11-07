

type IPrincipalProps = {
    id: string
    name: string
}
export default class Principal{

    public id: string
    public name: string

    private constructor({ id, name }: IPrincipalProps) {
        this.id = id
        this.name = name
    }

    public static create(name: string) {
        return new Principal({
            id: crypto.randomUUID().toString(),
            name
        })
    }

    public static with(props: IPrincipalProps) {
        return new Principal(props)
    }

}
