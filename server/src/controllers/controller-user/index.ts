import { NextFunction, Response } from "express"
import ApiError from '@api-error/index'
import {CreateUserRequest} from '@routers/router-user/types'
import serviceUser from '@services/service-user'
import {CreateUserDto} from '@common/dtos'

class ControllerUser {
    async registration(req: CreateUserRequest, res: Response, next: NextFunction) {
        try {
            const createUserDto: CreateUserDto = {
                id: req.body.id,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                role: req.body.role,
                phoneNumber: req.body.phoneNumber,
                addres: req.body.addres,
                password: req.body.password,
                balance: req.body.balance,
                banType: req.body.banType,
                avatar: req.body.avatar,
            }
            serviceUser.registration(createUserDto, res, next)

            
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error))
            }
        }
    }
    async login() {

    }
    async getAllUsers() {

    }
}

export default new ControllerUser()