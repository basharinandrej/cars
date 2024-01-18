import {NextFunction} from 'express'
import {CreateTypeCarRequest} from '@routers/router-type-car/types';
import { validationResult } from "express-validator";
import ApiError from '@api-error/index';


export default (req: CreateTypeCarRequest, _, next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return next(ApiError.bedRequest(errors.array()))
    }else{
        next()
    }
}