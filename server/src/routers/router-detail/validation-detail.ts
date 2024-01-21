import { body, header } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import { State } from '@common/enums';
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'


export const validationCreateDetail = {
    createChain() {
        return  [
            body('name')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('name'))
                .isLength({min: 2}).withMessage(errorStrings.minLength('name', 2)).trim(),

            body('vendorCode')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('vendorCode')).trim()
                .isLength({min: 2}).withMessage(errorStrings.minLength('vendorCode', 2)),

            body('categoryId').isNumeric().withMessage(errorStrings.beNumber('categoryId')).trim(),
            body('modelId').isNumeric().withMessage(errorStrings.beNumber('modelId')).trim(),
            body('wear').isNumeric().withMessage(errorStrings.beNumber('wear')).trim(),
            body('price').isNumeric().withMessage(errorStrings.beNumber('price')).trim(),

            //todo валидация для photo
            body('year')
                .isNumeric().withMessage(errorStrings.beNumber('year'))
                .isLength({min: 4, max: 4}).withMessage(errorStrings.minLength('year', 4))
                .withMessage(errorStrings.maxLength('year', 4)).trim(),

            body('state')
                .isIn([State.NEW, State.SECOND_HAND]).withMessage(errorStrings.shouldHaveString('state', [State.NEW, State.SECOND_HAND])),


            header('authorization').custom((value: string) => {
                const token = extractAccessToken(value)

                try {
                    const result = serviceToken.validationToken(token)

                    if(result.id) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.unauthorized()));
                    }

                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            })
        ]
    }
}