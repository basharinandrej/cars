

export interface FormRegistrationUserValueTypes {
    name: string
    surname: string
    password: string
    passwordDouble: string
    email: string
    phoneNumber: number
}

export interface RegistrationUserResponse {
    user: {
        id: number
        //other fields
    }
}