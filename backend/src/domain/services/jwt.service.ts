export interface IJwtService {
    encode: (payload: any) => string

    decode: (token: string) => any
}