import { body } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import { State } from '@common/enums';

export const validationCreateDetail= {
    createChain() {
        return  [
            body('name')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('name'))
                .isLength({min: 2}).withMessage(errorStrings.minLength('name', 2)).trim(),

            body('vendorCode')
                .notEmpty().withMessage(errorStrings.notBeEmptyField('vendorCode')).trim()
                .isLength({min: 2}).withMessage(errorStrings.minLength('vendorCode', 2)),

            body('typeDetailId').isNumeric().withMessage(errorStrings.beNumber('typeDetailId')).trim(),
            body('wear').isNumeric().withMessage(errorStrings.beNumber('wear')).trim(),
            body('price').isNumeric().withMessage(errorStrings.beNumber('price')).trim(),

            //todo валидация для photo
            body('year')
                .isNumeric().withMessage(errorStrings.beNumber('year'))
                .isLength({min: 4, max: 4}).withMessage(errorStrings.minLength('year', 4))
                .withMessage(errorStrings.maxLength('year', 4)).trim(),

            body('state')
                .isIn([State.NEW, State.SECOND_HAND]).withMessage(errorStrings.shouldHaveString('state', [State.NEW, State.SECOND_HAND]))
        ]
    }
}