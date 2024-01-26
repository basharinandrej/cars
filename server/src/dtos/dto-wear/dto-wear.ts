import { WearAttributes } from "@modelsdetail/detail-wear/types";
import {ParamsGetAllWears, ParamsGetOneWear} from '@controllers/controller-wear/types'
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

    getDtoWearGetAll(query: ParamsGetAllWears):DtoWearGetAll {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET
        }
    }

    getDtoWearGetById(query: ParamsGetOneWear): DtoWearGetById {
        return {
            id: query.id
        }
    }
}

export default new DtoWear()