import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import { OrganizationServiceCategoryAttributes, CreationOrganizationServiceCategory } from './types'


class OrganizationServiceCategory extends Model<OrganizationServiceCategoryAttributes, CreationOrganizationServiceCategory> {}

OrganizationServiceCategory.init({
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
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { 
    sequelize,
    tableName: 'organization_service-category',
    updatedAt: false
 })


export default OrganizationServiceCategory
