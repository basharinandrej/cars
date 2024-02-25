import {AppTypeError} from '../enums'

export interface DataValidationError {
    message: {
        errors: Array<{message: string}> 
    }
    status: 404
    type: AppTypeError.ValidationError
}


export interface DataInternalError {
    message: Array<{msg: string}>
    status: 404
    type: AppTypeError.InternalError
}

