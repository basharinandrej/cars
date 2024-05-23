
import { header, body, cookie } from 'express-validator';
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import {errorStrings} from '@common/error-strings'
import { isAdministrator } from '@common/guards';


export const validationOrganization = {
    loginChain() {
        return [
            body('password')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('password'))
                .isLength({min: 8}).withMessage(errorStrings.errorPasswordOrEmail()).trim(),

            body('email').isEmail().withMessage(errorStrings.errorPasswordOrEmail()).trim(),
        ]
    },
    getAllOrganizationChain() {
        return [
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
    },
    registrationChain() {
        return [
            body('name')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('name'))
                .isLength({min: 2}).withMessage(errorStrings.minLength('name', 2)).trim(),

            body('password')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('password'))
                .isLength({min: 8}).withMessage(errorStrings.minLength('password', 8)).trim(),

            body('email').isEmail().withMessage(errorStrings.uncorrectEmail()).trim(),

            body('phoneNumber')
                .isNumeric().withMessage(errorStrings.beNumber('phoneNumber'))
                .isLength({min: 11, max: 11}).withMessage(errorStrings.checkLengthPhoneNumber()).trim(),

            body('house').isNumeric().withMessage(errorStrings.beNumber('house')).trim(),
            body('street').notEmpty().withMessage(errorStrings.notBeEmptyField('street')).trim(),
        ]
    }
}

export const validationOrganizationChangePassword = {
    createChain() {
        return [
            cookie('refreshToken').custom((value: string) => {
                try {
                    const result = serviceToken.validationToken(value)
                    if(result.id) {
                        return Promise.resolve(true);
                    }
                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            }),

            body('oldPassword')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('password'))
                .isLength({min: 8}).withMessage(errorStrings.minLength('password', 8)).trim(),

            
            body('newPassword')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('password'))
                .isLength({min: 8}).withMessage(errorStrings.minLength('password', 8)).trim(),
        ]
    }
}