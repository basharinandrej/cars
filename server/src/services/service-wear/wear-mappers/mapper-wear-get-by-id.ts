import Wear from "@models/wear";


export const mapperWearGetById = (wear: Wear) => {
    return {
        id: wear.dataValues.id,
        name: wear.dataValues.name,
        description: wear.dataValues.description
    }
}