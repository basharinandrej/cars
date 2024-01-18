class ApiError extends Error{
    status: number
    message: string

    constructor(status: number, message: string) {
        super()

        this.message = message
        this.status = status
    }

    static bedRequest(message) {
        const defaultMessage = 'Некорректный запрос'

        return new ApiError(404, message || defaultMessage)
    }

    static internal(message) {
        const defaultMessage = 'Ошибка сервера'

        return new ApiError(500, message || defaultMessage)
    }
}

export default ApiError