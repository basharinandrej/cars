import { body, cookie } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { isAdministrator, isModerator, isPerson } from '@common/guards';
import { StatusRequest } from '@models/request/types';


export const validationCreateRequest = {
    createChain() {
        return  [
            body('recipientId').isNumeric().withMessage(errorStrings.beNumber('recipientId')).trim(),
            body('senderId').isNumeric().withMessage(errorStrings.beNumber('senderId')).trim(),

            body('description').notEmpty().withMessage(errorStrings.notBeEmptyField('description')).trim(),

            cookie('refreshToken').custom((value: string) => {

                try {
                    const result = serviceToken.validationToken(value)

                    if(isAdministrator(result) || isModerator(result) || isPerson(result)) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.onlyForAdmin()));
                    }

                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            }),
        ]
    }
}

export const validationRequestUpdation = {
    createChain() {
        return  [
            cookie('refreshToken').custom((value: string) => {

                try {
                    const result = serviceToken.validationToken(value)

                    console.log('>>> result', result)
                    if(isAdministrator(result) || isModerator(result) || isPerson(result) || result.isOrganization) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.onlyForAdmin()));
                    }

                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            }),
            body('status').isIn([
                StatusRequest.APPROVED,
                StatusRequest.DECLINED,
                StatusRequest.FINISHED,
                StatusRequest.IN_VIEWING
            ]).withMessage(errorStrings.shouldHaveString('status',[
                StatusRequest.APPROVED,
                StatusRequest.DECLINED,
                StatusRequest.FINISHED,
                StatusRequest.IN_VIEWING
            ])).trim(),   
            body('description').notEmpty().withMessage(errorStrings.notBeEmptyField('description')).trim(),
        ]
    }
}

