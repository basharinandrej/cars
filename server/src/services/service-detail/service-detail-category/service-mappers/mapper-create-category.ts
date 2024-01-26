import Category from '@models/detail/detail-category'

export const mapperCreateCategory = (category: Category) => {
    return {
        id: category.dataValues.id,
        name: category.dataValues.name,
    }
}