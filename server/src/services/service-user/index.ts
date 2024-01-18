import { NextFunction, Response } from "express"
import crypto from 'crypto'
import ApiError from '@api-error/index'
import User from '@models/user'
import {CreateUserDto} from '@common/dtos'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'

class ServiceUser {
    async registration(createUserDto: CreateUserDto, res: Response, next: NextFunction) {
        try {
            const canditate = await User.findOne({where: {email: createUserDto.email}})

            if(canditate) {
                next(ApiError.bedRequest(errorStrings.userAlreadyExist(canditate.dataValues.email)))
            }

            const hashPassword = await crypto.createHash('sha256').update(createUserDto.password).digest('hex')

            const user = await User.create({
                name: createUserDto.name,
                surname: createUserDto.surname,
                password: hashPassword,
                email: createUserDto.email,
                role: createUserDto.role,
                phoneNumber: createUserDto.phoneNumber
            })

            const {accessToken, refreshToken} = serviceToken.generateTokens({
                id: user.dataValues.id,
                name: user.dataValues.name,
                role: user.dataValues.role
            })
            
            await serviceToken.saveToken(refreshToken, user.dataValues.id)
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})

            res.send({user, accessToken})
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ServiceUser()