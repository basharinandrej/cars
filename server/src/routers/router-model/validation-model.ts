import { body } from 'express-validator';
import {errorStrings} from '@common/error-strings'

export const validationCreateModel = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
            body('brandId').isNumeric().withMessage(errorStrings.beNumber('brandId')).trim(),
            body('typeCarId').isNumeric().withMessage(errorStrings.beNumber('typeCarId')).trim(),
        ]
    }
}