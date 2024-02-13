import Token from '@models/user/token'
import { EMPTY_STRING } from '@common/constans';
import jwt from 'jsonwebtoken'
import {PayloadToken} from '@common/types'

class ServiceToken {
    private secretString = process.env.SECRET_KEY || EMPTY_STRING

    private createToken(payloadToken: PayloadToken, expiresIn: string) {
        return jwt.sign(
            payloadToken, 
            this.secretString, 
            { expiresIn}
        )
    }

    public generateTokens(payloadToken: PayloadToken) {
        const accessToken = this.createToken(payloadToken, '30m')
        const refreshToken = this.createToken(payloadToken, '30d')
    
        return {accessToken, refreshToken}
    }

    public validationToken(token: string): PayloadToken {
        return jwt.verify(token, process.env.SECRET_KEY || EMPTY_STRING)
    }
    
    public async saveToken(token: string, userId: number,) {
        return await Token?.create({
            refreshToken: token, 
            userId,
        })
    }
    
    public async saveTokenOrganization(token: string, organizationId: number) {
        return await Token?.create({
            refreshToken: token, 
            organizationId,
        })
    }
    // public async dropToken(refreshToken: string) {
    //     return await Token?.destroy(
    //         {where: {refreshToken}
    //     })
    // }
}

export const serviceToken = new ServiceToken()