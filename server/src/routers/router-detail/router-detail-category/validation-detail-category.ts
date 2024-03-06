import { cookie, body } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { isAdministrator } from '@common/guards';


export const validationCreateDetailCategory = {
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

export const validationUpdateDetailCategory = {
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
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField("name")).trim()
        ]
    }
}