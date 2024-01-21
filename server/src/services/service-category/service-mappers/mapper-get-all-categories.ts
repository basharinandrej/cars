import Category from "@models/category/index"

interface CategoriesDate {
    rows: Category[]
    count: number 
}

export const mapperGetAllCategories = (categories: CategoriesDate) => {
    return {
        total: categories.count,
        items: categories.rows.map(category => {
            return {
                id: category.dataValues.id,
                name: category.dataValues.name
            }
        })
    }
}