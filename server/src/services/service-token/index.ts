import { EMPTY_STRING } from '@common/constans';
import jwt from 'jsonwebtoken'
import {PayloadToken} from '@common/types'

class ServiceToken {
    private secretString = process.env.SECRET_KEY || EMPTY_STRING

    private createToken(payloadToken: PayloadToken, expiresIn: string): string {
        return jwt.sign(
            payloadToken, 
            this.secretString, 
            { expiresIn}
        )
    }

    public generateTokens(payloadToken: PayloadToken) {
        const refreshToken = this.createToken(payloadToken, '30d')
    
        return {refreshToken}
    }

    public validationToken(token: string): PayloadToken {
        return jwt.verify(token, process.env.SECRET_KEY || EMPTY_STRING) as PayloadToken
    }
}

export const serviceToken = new ServiceToken()