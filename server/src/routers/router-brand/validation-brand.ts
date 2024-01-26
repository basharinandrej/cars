import { body, query, header } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import { SortOrder } from '@common/enums';
import ApiError from '@api-error/index'
import { isAdministrator } from '@commonchecks';


export const validationCreateBrand = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField("name")).trim(),
            body('name').isLength({min: 2}).withMessage(errorStrings.minLength("name", 2)).trim(),
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
    }
}

export const validationGetAllBrands = {
    createChain() {
        return [
            query('sort')
                .custom((value) => {
                    if(value === 'name') {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(errorStrings.sort.brandSort('name', value));
                    }
                }),
            query('order').custom((value: SortOrder) => {
                if(value === SortOrder.Asc || value === SortOrder.Desc) {
                    return Promise.resolve(true);
                } else {
                    return Promise.reject(errorStrings.sorderValue());
                }
            })
        ]
    }
}