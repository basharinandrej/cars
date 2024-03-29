import { body, query, cookie } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import { SortOrderBy } from '@common/enums';
import ApiError from '@api-error/index'
import { isAdministrator, isOrderByAsc, isOrderByDesc } from '@common/guards';


export const validationCreateBrand = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField("name")).trim(),
            body('name').isLength({min: 2}).withMessage(errorStrings.minLength("name", 2)).trim(),
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
    }
}

export const validationGetAllBrands = {
    createChain() {
        return [
            query('sortBy')
                .custom((value) => {
                    if(value === 'name') {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(errorStrings.sort.brandSort('name', value));
                    }
                }),
            query('orderBy').custom((value: SortOrderBy) => {
                if(isOrderByAsc(value) || isOrderByDesc(value)) {
                    return Promise.resolve(true);
                } else {
                    return Promise.reject(errorStrings.sorderValue());
                }
            })
        ]
    }
}

export const validationBrandUpdation = {
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
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField("name")).trim(),
        ]
    }
}