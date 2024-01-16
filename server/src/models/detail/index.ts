import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import { DetailAttributes } from './types'


class Detail extends Model<DetailAttributes, DetailAttributes> {}

Detail.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendorCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    wear: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    year: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    photos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('NEW', 'SECOND_HAND'),
        allowNull: false
    },
}, { 
    sequelize,
    tableName: 'details',
    updatedAt: false
 })


export default Detail
