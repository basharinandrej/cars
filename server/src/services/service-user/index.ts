import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import User from '@models/user'
import {CreateUserDto, LoginUserDto} from '@common/dtos'
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import {getHashPassword} from './utils/get-hash-password'
import {compareHashPassword} from './utils/compare-hash-password'

class ServiceUser {
    async registration(createUserDto: CreateUserDto, res: Response, next: NextFunction) {
        try {
            const canditate = await User.findOne({where: {email: createUserDto.email}})

            if(canditate) {
                next(ApiError.bedRequest(errorStrings.userAlreadyExist(canditate.dataValues.email)))
            }

            const hashPassword = await getHashPassword(createUserDto.password)

            const user = await User.create({
                name: createUserDto.name,
                surname: createUserDto.surname,
                password: hashPassword,
                email: createUserDto.email,
                role: createUserDto.role,
                phoneNumber: createUserDto.phoneNumber
            })
            //добавить почту

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

    async login(loginUserDto: LoginUserDto, res: Response, next: NextFunction) {
        try {
            const canditate = await User.findOne({where: {email: loginUserDto.email}})

            if(!canditate) {
                next(ApiError.bedRequest(errorStrings.notFoundUser(canditate.dataValues.email)))
            }

            const hashPassword = await getHashPassword(loginUserDto.password)
            const isMatchPasswords = await compareHashPassword(loginUserDto.password, hashPassword)
  
            if(isMatchPasswords) {
                const {accessToken, refreshToken} = serviceToken.generateTokens({
                    id: loginUserDto.id,
                    name: loginUserDto.name,
                    role: loginUserDto.role
                })
                await serviceToken.saveToken(refreshToken, loginUserDto.id)
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})

                res.send({user: canditate, accessToken})
            } else {
                next(ApiError.bedRequest(errorStrings.errorPassword()))
            }

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
}

export default new ServiceUser()