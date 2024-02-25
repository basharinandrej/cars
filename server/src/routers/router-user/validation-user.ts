
import { cookie, body } from 'express-validator';
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { UserRoles } from '@common/enums';
import {errorStrings} from '@common/error-strings'
import { isAdministrator } from '@common/guards';

export const validationUser = {
    loginChain() {
        return [
            body('password')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('password'))
                .isLength({min: 8}).withMessage(errorStrings.minLength('password', 8)).trim(),

            body('email').isEmail().withMessage(errorStrings.uncorrectEmail()).trim(),
        ]
    },
    getAllUsersChain() {
        return [
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
        ]
    },
    registrationChain() {
        return [
            body('name')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('name'))
                .isLength({min: 2}).withMessage(errorStrings.minLength('name', 2)).trim(),

            body('surname')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('surname'))
                .isLength({min: 2}).withMessage(errorStrings.minLength('name', 2)).trim(),

            body('password')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('password'))
                .isLength({min: 8}).withMessage(errorStrings.minLength('password', 8)).trim(),

            body('email').isEmail().withMessage(errorStrings.uncorrectEmail()).trim(),
            
            body('role').isIn([
                UserRoles.Admin, 
                UserRoles.Moderator,  
                UserRoles.Person
            ]).withMessage(errorStrings.shouldHaveString('role',[
                UserRoles.Admin, 
                UserRoles.Moderator, 
                UserRoles.Person
            ])).trim(),

            body('phoneNumber')
                .isNumeric().withMessage(errorStrings.beNumber('phoneNumber'))
                .isLength({min: 11, max: 11}).withMessage(errorStrings.checkLengthPhoneNumber()).trim(),
        ]
    }
}