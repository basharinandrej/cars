import { body, header } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { isAdministrator, isModerator, isPerson } from '@common/guards';

export const validationCarCreation = {
    createChain() {
        return  [
            body('vinCode').notEmpty().withMessage(errorStrings.notBeEmptyField("vinCode")).trim(),
            body('brand').notEmpty().withMessage(errorStrings.notBeEmptyField("brand")).trim(),
            body('model').notEmpty().withMessage(errorStrings.notBeEmptyField("model")).trim(),
            body('color').notEmpty().withMessage(errorStrings.notBeEmptyField("color")).trim(),
            body('year').notEmpty().withMessage(errorStrings.notBeEmptyField("year")).trim(),

            body('vinCode').isLength({min: 17, max: 17}).withMessage(errorStrings.minLength("vinCode", 17)).trim(),
            header('authorization').custom((value: string) => {
                const token = extractAccessToken(value)

                try {
                    const result = serviceToken.validationToken(token)

                    if(isAdministrator(result) || isPerson(result) || isModerator(result)) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.withoutOrganization()));
                    }

                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            })
        ]
    }
}