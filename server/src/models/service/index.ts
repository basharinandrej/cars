import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import { ServiceAttributes, CreationService } from './types'


class Service extends Model<ServiceAttributes, CreationService> {}

Service.init({
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
    tableName: 'services',
    updatedAt: false
 })


export default Service
