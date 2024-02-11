import { body, header, query } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {extractAccessToken} from '@common/utils/extract-tokens'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import {DetailWears} from '@common/enums'
import {MAX_TOTAL_PHOTOS_PER_DETAIL} from '@common/constans'


export const validationCreateDetail = {
    createChain() {
        return  [
            body('name')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('name'))
                .isLength({min: 2}).withMessage(errorStrings.minLength('name', 2)).trim(),

            body('vendorCode')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('vendorCode')).trim()
                .isLength({min: 2}).withMessage(errorStrings.minLength('vendorCode', 2)),

            body('detailCategoryId').isNumeric().withMessage(errorStrings.beNumber('detailCategoryId')).trim(),
            body('modelId').isNumeric().withMessage(errorStrings.beNumber('modelId')).trim(),
            body('wear').isIn([
                DetailWears.CanBeUsed,
                DetailWears.NeedFix,
                DetailWears.New,
            ]).withMessage(errorStrings.shouldHaveString('wear',[
                DetailWears.CanBeUsed,
                DetailWears.NeedFix,
                DetailWears.New,
            ])).trim(),            
            body('price').isNumeric().withMessage(errorStrings.beNumber('price')).trim(),

            body('year')
                .isNumeric().withMessage(errorStrings.beNumber('year')).trim()
                .isLength({min: 4, max: 4}).withMessage(errorStrings.minLength('year', 4)).trim()
                .withMessage(errorStrings.maxLength('year', 4)).trim(),

            body('photos').custom((_, meta) => {
                const photos = meta.req.files.photos

                console.log('>>> photos', photos)
                if(!Array.isArray(photos)) {
                    if(photos.name && photos.size) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.mustBeAtLeastOnePhoto()));
                    }
                } else {
                    if(photos.length <= MAX_TOTAL_PHOTOS_PER_DETAIL) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.maxTotalPhotosDetail()));
                    }
                }
            }),

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

export const validationGetByIdDetail = {
    createChain() {
        return [
            query('id')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('id'))
        ]
    }
}
