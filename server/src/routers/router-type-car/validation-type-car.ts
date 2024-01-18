import { body } from 'express-validator';


export const validationCreateTypeCar = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage('Поля name пустое').trim(),
        ]
    }
}