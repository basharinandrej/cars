import { body, header } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'


export const validationServiceCreation = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
            body('description').notEmpty().withMessage(errorStrings.notBeEmptyField('description')).trim(),
            body('price').notEmpty().withMessage(errorStrings.notBeEmptyField('price')).trim(),
            body('serviceCategoryId').isNumeric().withMessage(errorStrings.beNumber('serviceCategoryId')).trim(),
            header('authorization').custom((value: string) => {
                const token = extractAccessToken(value)

                try {
                    const result = serviceToken.validationToken(token)

                    if(result.isOrganization) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.onlyForOrganiztion()));
                    }
                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            })
        ]
    }
}