import { Model, DataTypes } from "sequelize";
import {instanceSequelize as sequelize} from '@db/index'
import {ServiceCategoryAttributes, CreationServiceCategory} from './types'

class ServiceCategory extends Model<ServiceCategoryAttributes, CreationServiceCategory> {}

ServiceCategory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    sequelize,
    tableName: 'service-categoryies',
    updatedAt: false
})

export default ServiceCategory
