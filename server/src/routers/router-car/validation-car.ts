import { body, cookie } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {MIN_LENGTH_VIN_CODE,LENGTH_VIN_CODE, MAX_LENGTH_VIN_CODE} from '@common/constans'
import {serviceToken} from '@services/service-token'
import {isAdministrator} from '@common/guards'
import ApiError from '@api-error/index';

export const validationCarCreation = {
    createChain() {
        return  [
            body('vinCode').notEmpty().withMessage(errorStrings.notBeEmptyField("vinCode")).trim(),
            body('brand').notEmpty().withMessage(errorStrings.notBeEmptyField("brand")).trim(),
            body('model').notEmpty().withMessage(errorStrings.notBeEmptyField("model")).trim(),
            body('color').notEmpty().withMessage(errorStrings.notBeEmptyField("color")).trim(),
            body('year').notEmpty().withMessage(errorStrings.notBeEmptyField("year")).trim(),
            body('vinCode').isLength({min: MIN_LENGTH_VIN_CODE, max: MAX_LENGTH_VIN_CODE}).withMessage(errorStrings.minLength("vinCode", LENGTH_VIN_CODE)).trim(),
        ]
    }
}


export const validationCarUpdation = {
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
            body('vinCode').notEmpty().withMessage(errorStrings.notBeEmptyField("vinCode")).trim(),
            body('vinCode')
                .isLength({min: MIN_LENGTH_VIN_CODE, max: MAX_LENGTH_VIN_CODE})
                .withMessage(errorStrings.minLength("vinCode", LENGTH_VIN_CODE))
                .trim(),
            
        ]
    }
}