import jwt from 'jsonwebtoken'

import { IJwtService } from '@/domain/services'
import config from '../config'

export class JwtService implements IJwtService {
    encode(payload: any): string {
        const token = jwt.sign(payload, config.secret)

        return token
    }

    decode(token: string): any {
        const payload = jwt.decode(token)

        return payload
    }
}
