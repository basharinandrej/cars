import { body } from 'express-validator';


export const validationCreateModel = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage('Поля name пустое').trim(),
        ]
    }
}