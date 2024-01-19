import { Request } from "express";
import { UserAttributes } from '@models/user/types'
import {EmptyString} from '@common/types'


export interface RegistrationUserRequest extends Request<Record<string, unknown>, EmptyString, UserAttributes> {}
export interface LoginUserRequest extends Request<Record<string, unknown>, EmptyString, UserAttributes> {}

interface GetUsers {
    limit?: number,
    offset?: number
}

export interface GetUsersRequest extends Request<Record<string, unknown>, EmptyString, EmptyString, GetUsers> {}
