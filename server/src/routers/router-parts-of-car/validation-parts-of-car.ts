import { body } from 'express-validator';
import {errorStrings} from '@common/error-strings'

export const validationCreatePartsOfCar= {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
            body('name').isLength({min: 2}).withMessage(errorStrings.minLength('name', 2)).trim(),
            body('typeCarId').isNumeric().withMessage(errorStrings.beNumber('typeCarId')).trim(),
        ]
    }
}