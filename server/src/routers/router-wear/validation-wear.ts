import { body, header, query } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { UserRoles } from '@common/enums';


export const validationCreateWear = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
            body('description').notEmpty().withMessage(errorStrings.notBeEmptyField('description')).trim(),
            header('authorization').custom((value: string) => {
                const token = extractAccessToken(value)

                try {
                    const result = serviceToken.validationToken(token)

                    if(result?.role === UserRoles.ADMIN) {
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