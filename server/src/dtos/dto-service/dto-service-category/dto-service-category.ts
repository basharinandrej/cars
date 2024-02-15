import { ServiceCategoryAttributes } from "@models/service-category/types";
import { ParamsGetServiceCategories } from '@controllers/controller-service-category/types'
import {DtoServiceCategoryCreation, DtoServiceCategoryGetAll} from './types'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_OFFSET } from "@common/constans";

class DtoServiceCategory {

    getDtoServiceCategoryCreation(serviceCategory: ServiceCategoryAttributes): DtoServiceCategoryCreation {
        return {
            name: serviceCategory.name,
            description: serviceCategory.description
        }
    }

    getDtoServiceCategoryGetAll(query: ParamsGetServiceCategories): DtoServiceCategoryGetAll  {
        return {
            limit: query.limit || PAGINATION_DEFAULT_LIMIT,
            offset: query.offset || PAGINATION_DEFAULT_OFFSET
        }
    }
}


export default new DtoServiceCategory()