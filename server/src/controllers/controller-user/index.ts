import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import {RegistrationUserRequest} from '@routers/router-user/types'
import serviceUser from '@services/service-user'
import dto from '@dto/index'

class ControllerUser {
    async registration(req: RegistrationUserRequest, res: Response, next: NextFunction) {
        try {
            const registrationUserDto = dto.registrationUserDto(req.body)
            const {refreshToken, user, accessToken} = await serviceUser.registration(registrationUserDto, next)

            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000,  httpOnly: true})
            res.send({user, accessToken})

        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
    async login(req, res: Response, next: NextFunction) {
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

    async getAllUsers() {

    }
}

export default new ControllerUser()