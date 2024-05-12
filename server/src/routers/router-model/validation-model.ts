import { body, cookie } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { isAdministrator } from '@common/guards';


export const validationCreateModel = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
            body('brandId').notEmpty().withMessage(errorStrings.notBeEmptyField('brandId')).trim(),
            cookie('refreshToken').custom((value: string) => {
                try {
                    const result = serviceToken.validationToken(value)

                    if(isAdministrator(result)) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.onlyForAdmin()));
                    }

                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            })
        ]
    }
}

export const validationModelUpdation = {
    createChain() {
        return  [
            cookie('refreshToken').custom((value: string) => {

                try {
                    const result = serviceToken.validationToken(value)

                    if(isAdministrator(result)) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.onlyForAdmin()));
                    }

                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            }),
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField("name")).trim(),
        ]
    }
}