import { body, header } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import {extractAccessToken} from '@common/utils/extract-tokens'
import { UserRoles } from '@common/enums';

export const validationCreateTypeDetail = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField("name")).trim(),
            body('name').isLength({min: 2}).withMessage(errorStrings.minLength("name", 2)).trim(),
            body('partsOfCarId').isNumeric().withMessage(errorStrings.beNumber('partsOfCarId')).trim(),
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