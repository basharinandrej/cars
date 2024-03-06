import { body, header, cookie } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { isAdministrator } from '@common/guards';


export const validationCreateServiceCategory = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
            header('authorization').custom((value: string) => {
                const token = extractAccessToken(value)

                try {
                    const result = serviceToken.validationToken(token)

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

export const validationUpdateServiceCategory = {
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