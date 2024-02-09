
import { header, body } from 'express-validator';
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import {errorStrings} from '@common/error-strings'
import { isAdministrator } from '@common/guards';
import {AddressAttributes} from '@models/address/types'


export const validationOrganization = {
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

            body('fingerPrint')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('fingerPrint')).trim(),

            // body('address').custom((address: Omit<AddressAttributes, 'id'>) => {
            //     try {
            //         const totalKeysAddress = Object.entries(address)
            //             .map(([key, value]) => {
            //                 if(!value) {
            //                     return Promise.reject(ApiError.bedRequest(errorStrings.uncorrectAddress(`нет поля ${key}`)));
            //                 }else{
            //                     return Promise.resolve(true);
            //                 }
            //             })
            //             .length

            //         if(totalKeysAddress < 3) {
            //             return Promise.reject(ApiError.bedRequest(errorStrings.uncorrectAddress('нет - улицы, дома, города')));
            //         }else{
            //             return Promise.resolve(true);
            //         }
            //     } catch (error) {
            //     }
            // })
        ]
    }
}