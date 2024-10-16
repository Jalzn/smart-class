export interface IHashService {
    hash: (value: string) => string
    compare: (value: string, hash: string) => boolean
}
