
import { PrismaClient } from "@prisma/client"
import { Principal } from '@/domain/entities';
import { IPrincipalRepository } from "@/domain/repositories"


export class PrincipalRepository implements IPrincipalRepository {
    private client: PrismaClient

    constructor(client: PrismaClient) {
        this.client = client
    }


    async findById(id: string) {
        const principal = await this.client.principal.findFirstOrThrow({ 
            where: { id },
        })

        return principal
    }
    
    async update() {

    }

    async deleteById(id: string) {

        await this.client.principal.delete({
            where: { id },
        })
    }



    async create(Principal: Principal) {
        await this.client.principal.create({
            data: {
                id: Principal.id,
                name: Principal.name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    };

}