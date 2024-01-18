import { body } from 'express-validator';


export const validationCreatePartsOfCar= {
    createChain() {
        return  [
            body('name').notEmpty().withMessage('Поля name пустое').trim(),
            body('name').isLength({min: 2}).withMessage('Название < 2').trim(),
            body('typeCarId').isNumeric().withMessage('Значение поля typeCarId должно быть числом').trim(),
        ]
    }
}