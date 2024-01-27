import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import {ParamsUserGetAll} from '@controllers/controller-user/types'
import serviceUser from '@services/service-user'
import dtoUser from '@dtos/dto-user/dto-user'
import { RequestCreation, RequestGetAll } from "@common/types"
import {UserRequestParams} from '@common/interfaces'


class ControllerUser {
    async registration(req: RequestCreation<UserRequestParams>, res: Response, next: NextFunction) {
        try {
            const dtoUserRegistration = dtoUser.registrationUserDto(req.body)
            const {refreshToken, user, accessToken} = await serviceUser.registration(dtoUserRegistration, next)

            // отправка картинки на Яндекс диск
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
            res.send({user, accessToken})

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
                const {refreshToken, user, accessToken} = result
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                res.send({user, accessToken})
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

    // async logout() {}

    // async dropPassword

    // async changePassword ?
}

export default new ControllerUser()