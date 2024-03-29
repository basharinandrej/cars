class ApiError extends Error{
    status: number
    message: string
    type: string

    constructor(status: number, message: string) {
        super()

        this.message = message
        this.status = status
        this.type = status === 500 ? 'internalError' :  'validationError'
    }

    static bedRequest(message) {
        const defaultMessage = 'Некорректный запрос'

        return new ApiError(404, message || defaultMessage)
    }

    static internal(message) {
        const defaultMessage = 'Ошибка сервера'

        return new ApiError(500, message || defaultMessage)
    }

    static unauthorized(message) {
        const defaultMessage = 'Неавторизован'
        return new ApiError(403, message || defaultMessage)
    }
}

export default ApiError