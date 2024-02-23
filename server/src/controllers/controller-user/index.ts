import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import {ParamsUserGetAll} from '@controllers/controller-user/types'
import serviceUser from '@services/service-user'
import dtoUser from '@dtos/dto-user/dto-user'
import { RequestCreation, RequestGetAll, RequestGetOne } from "@common/types"
import {UserRequestParams} from '@common/interfaces'
import {serviceToken} from '@services/service-token'
import User from "@models/user"

class ControllerUser {
    async registration(req: RequestCreation<UserRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoUserRegistration = dtoUser.registrationUserDto(req.body)
            const {refreshToken, user} = await serviceUser.registration(dtoUserRegistration, next)

            // отправка картинки на Яндекс диск
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
            res.send({user})

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
    async login(req: RequestCreation<UserRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoUserLogin = dtoUser.loginUserDto(req.body)
            const result = await serviceUser.login(dtoUserLogin, next)

            if(result) {
                const {refreshToken, user} = result
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                res.send({user})
            }
        } catch (error) {                

            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllUsers(req: RequestGetAll<ParamsUserGetAll>, res: Response, next: NextFunction) {

        const dtoUserGetAll = dtoUser.getAllUsersDto(req.query)
        const users = await serviceUser.getAllUsers(dtoUserGetAll, next)

        res.send(users)
    }

    async initUser(req: RequestGetOne<void>, res: Response, next: NextFunction) {
        try{
            const dtoUserInit = dtoUser.getDtoInitUser(req.cookies)
            const {user, refreshToken} = await serviceUser.initUser(dtoUserInit, next)
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})

            res.send({user})
        } catch(err) {
            if(err instanceof Error) {
                next(ApiError.bedRequest(err.message))
            }
        }


    }

    async update(req:RequestCreation<UserRequestParams> , res: Response, next: NextFunction) {
        try {
            const dtoUserUpdate = dtoUser.getDtoUpdateUser(req.body)
            const user = await serviceUser.updateUser(dtoUserUpdate, next)

            res.send(user)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error.message))
            }
        }
    }

    async logout(_: unknown, res: Response, next: NextFunction) {
        try {
            res.clearCookie('refreshToken')
            res.send('logout')
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.bedRequest(error.message))
            }
        }
    }

    // async dropPassword

    // async changePassword ?
}

export default new ControllerUser()