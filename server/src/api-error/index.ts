class ApiError extends Error{
    status: number
    message: string
    type: string
    source?: string

    constructor(status: number, message: string, source?: string) {
        super()

        this.message = message
        this.status = status
        this.type = status === 500 ? 'internalError' :  'validationError',
        this.source = process.env.NODE_ENV === 'development' ? source : 'information only for development env'
    }

    static bedRequest(message: string) {
        const defaultMessage = 'Некорректный запрос'

        return new ApiError(404, message || defaultMessage)
    }

    static internal(message: string, source: string) {
        const defaultMessage = 'Ошибка сервера'

        return new ApiError(500, message || defaultMessage, source)
    }

    static unauthorized(message: string) {
        const defaultMessage = 'Неавторизован'
        return new ApiError(403, message || defaultMessage)
    }
}

export default ApiError