import { Response } from 'express'
import serviceDataBase from '@services/service-data-base'

class ControllerDataBase {
    //@ts-ignore
    async drop(_, res: Response) {
        try {
            await serviceDataBase.drop(res)
        } catch (error) {
            console.log('>>> error', error)
        }
    }
}

export default new ControllerDataBase()