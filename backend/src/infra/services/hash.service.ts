import { IHashService } from '@/domain/services'
import bcrypt from 'bcrypt'

export class HashService implements IHashService {
    hash(value: string): string {
        const hashedValue = bcrypt.hashSync(value, 10)
        return hashedValue
    }

    compare(value: string, hash: string): boolean {
        return bcrypt.compareSync(value, hash)
    }
}
