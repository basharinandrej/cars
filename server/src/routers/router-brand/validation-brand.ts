
import { body } from 'express-validator';


export const validationCreateBrand = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage('Поля name пустое').trim(),
            body('name').isLength({min: 2}).withMessage('Название бренда должно содержать минимум 3 символа').trim(),
        ]
    }
}