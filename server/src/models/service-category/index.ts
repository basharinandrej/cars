import { Model, DataTypes } from "sequelize";
import {instanceSequelize as sequelize} from '@db/index'
import {ServiceCategoryAttributes, CreationServiceCategory} from './types'

class ServiceCategory extends Model<ServiceCategoryAttributes, CreationServiceCategory> {}

sequelize && ServiceCategory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    sequelize,
    tableName: 'service-categories',
    updatedAt: false
})

export default ServiceCategory
