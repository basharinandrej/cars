import {NextFunction} from 'express'
import { validationResult } from "express-validator";
import ApiError from '@api-error/index';


export default (req: unknown, _, next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return next(ApiError.bedRequest(errors.array()))
    }else{
        next()
    }
}