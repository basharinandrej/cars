import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import { DetailAttributes, CreationDetail } from './types'


class Detail extends Model<DetailAttributes, CreationDetail> {}

Detail.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendorCode: {
        type: DataTypes.STRING,
        allowNull: false,
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
