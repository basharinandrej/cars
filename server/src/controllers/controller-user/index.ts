import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import {RegistrationUserRequest, LoginUserRequest, GetUsersRequest} from '@routers/router-user/types'
import serviceUser from '@services/service-user'
import dtoUser from '@dtos/dto-user'

class ControllerUser {
    async registration(req: RegistrationUserRequest, res: Response, next: NextFunction) {
        try {
            const registrationUserDto = dtoUser.registrationUserDto(req.body)
            const {refreshToken, user, accessToken} = await serviceUser.registration(registrationUserDto, next)

            // отправка картинки на Яндекс диск
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
            res.send({user, accessToken})

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
    async login(req: LoginUserRequest, res: Response, next: NextFunction) {
        try {
            const loginUserDto = dtoUser.loginUserDto(req.body)
            const result = await serviceUser.login(loginUserDto, next)

            if(result) {
                const {refreshToken, user, accessToken} = result
                res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
                res.send({user, accessToken})
            }
        } catch (error) {                

            console.log('>>> error 2', error)
            if(error instanceof Error) {

                next(ApiError.internal(error))
            }
        }
    }

    async getAllUsers(req: GetUsersRequest, res: Response, next: NextFunction) {

        const getAllUserDto = dtoUser.getAllUsersDto(req)
        const result = await serviceUser.getAllUsers(getAllUserDto, next)

        res.send(result)
    }

    // async logout() {}

    // async dropPassword

    // async changePassword ?
}

export default new ControllerUser()