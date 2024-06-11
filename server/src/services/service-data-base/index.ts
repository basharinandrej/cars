import { Response } from 'express'
import {instanceSequelize as sequelize} from '@db/index'

class ServiceDataBase {
    async drop(res: Response) {
        const result = await sequelize?.drop({cascade: true})
        res.send(result)
    }
}

export default new ServiceDataBase()