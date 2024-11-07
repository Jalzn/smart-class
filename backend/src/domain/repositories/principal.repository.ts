import { Principal } from '../entities'

export interface IPrincipalRepository {
    findById: (id: string) => Promise<Principal>
    create: (principal: Principal) => Promise<void>
    update: (principal: Principal, data: Partial<Principal>) => Promise<void>
    deleteById: (id: string) => Promise<void>
}
