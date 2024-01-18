import { body } from 'express-validator';
import {errorStrings} from '@common/error-strings'

export const validationCreateTypeCar = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
        ]
    }
}