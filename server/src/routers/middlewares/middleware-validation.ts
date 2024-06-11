import {NextFunction} from 'express'
import { validationResult } from "express-validator";
import ApiError from '@api-error/index';


//@ts-ignore
export default (req: unknown, _, next: NextFunction) => {
    //@ts-ignore
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        //@ts-ignore
        return next(ApiError.bedRequest(errors.array()))
    }else{
        next()
    }
}