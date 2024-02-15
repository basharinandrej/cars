import {DtoServiceCategoryCreation} from '@dtosdto-service/dto-service-category/types'
import ServiceCategory from '@models/service-category'

interface ReturnModelDto extends DtoServiceCategoryCreation {
    id: number
}

export const mapperServiceCategoryCreation = (serviceCategory: ServiceCategory): ReturnModelDto => {
    return {
        id: serviceCategory.dataValues.id,
        name: serviceCategory.dataValues.name,
        description: serviceCategory.dataValues.description,
    }
}