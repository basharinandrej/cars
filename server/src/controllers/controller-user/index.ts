import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import {RegistrationUserRequest, LoginUserRequest, GetUsersRequest} from '@routers/router-user/types'
import serviceUser from '@services/service-user'
import dto from '@dto/index'

class ControllerUser {
    async registration(req: RegistrationUserRequest, res: Response, next: NextFunction) {
        try {
            const registrationUserDto = dto.registrationUserDto(req.body)
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
            const loginUserDto = dto.loginUserDto(req.body)
            const {refreshToken, user, accessToken} = await serviceUser.login(loginUserDto, next)

            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
            res.send({user, accessToken})

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }

    async getAllUsers(req: GetUsersRequest, res: Response, next: NextFunction) {

        const getAllUserDto = dto.getAllUsersDto(req)
        const result = await serviceUser.getAllUsers(getAllUserDto, next)

        res.send(result)
    }

    // async logout() {}
}

export default new ControllerUser()