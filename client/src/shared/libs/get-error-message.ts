import {DataValidationError, DataInternalError} from '../interfaces/errors'
import {AppTypeError} from '../enums'


export const getErrorMessage = (error: any) => {
    const data = error.response.data


    if(data.type === AppTypeError.InternalError) {
        return (data as DataValidationError).message.errors[0].message
    }

    if(data.type === AppTypeError.ValidationError) {
        return (data as DataInternalError).message[0].msg
    }
}

