import { body, header } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import { isAdministrator, isModerator, isPerson } from '@common/guards';


export const validationCreateRequest = {
    createChain() {
        return  [
            body('recipientId').isNumeric().withMessage(errorStrings.beNumber('recipientId')).trim(),
            body('senderId').isNumeric().withMessage(errorStrings.beNumber('senderId')).trim(),

            body('description').notEmpty().withMessage(errorStrings.notBeEmptyField('description')).trim(),

            header('authorization').custom((value: string) => {
                const token = extractAccessToken(value)

                try {
                    const result = serviceToken.validationToken(token)

                    if(isAdministrator(result) || isPerson(result) || isModerator(result)) {
                        return Promise.resolve(true);
                    } else {
                        // return Promise.reject(ApiError.bedRequest(errorStrings.notOrganization()));
                    }

                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            })
        ]
    }
}

