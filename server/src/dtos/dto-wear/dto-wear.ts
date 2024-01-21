import { WearAttributes } from "@models/wear/types";
import {GetWears, GetByIdWear} from '@routers/router-wear/types'
import {DtoWearCreation, DtoWearGetAll, DtoWearGetById} from './types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";


class DtoWear {

    getDtoWearCreation(wear: WearAttributes): DtoWearCreation {
        return {
            id: wear.id,
            name: wear.name,
            description: wear.description,
        }
    }

    getDtoWearGetAll(query: GetWears):DtoWearGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET
        }
    }

    getDtoWearGetById(query: GetByIdWear): DtoWearGetById {
        return {
            id: query.id
        }
    }
}

export default new DtoWear()