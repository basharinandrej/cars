// import { NextFunction } from 'express';
import Token from '@models/token'
import { EMPTY_STRING } from '@common/constans';
import jwt from 'jsonwebtoken'
// import ApiError from '@api-error/index'
import {PayloadToken} from './types'

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

    // public validationToken(token: string, next?: NextFunction) {
    //     try {
    //         return jwt.verify(token, process.env.SECRET_KEY || EMPTY_STRING)
    //     } catch (error) {
    //         if(error instanceof Error) {
    //             next?.(ApiError.unauthorized(error?.message))
    //             // if(!next) {
    //             //     throw new Error(error.message) 
    //             // }
    //         }
    //     }
    // }
    
    public async saveToken(token: string, userId: number) {
        return await Token?.create({
            refreshToken: token, 
            userId
        })
    }

    // public async dropToken(refreshToken: string) {
    //     return await Token?.destroy(
    //         {where: {refreshToken}
    //     })
    // }
}

export const serviceToken = new ServiceToken()