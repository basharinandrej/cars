import ApiError from '@api-error/index'

//@ts-ignore
export default (error, req, res, next) => {

    if(error instanceof ApiError) {
        return res.status(error.status).send(error)
    }
}