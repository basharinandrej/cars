import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import { DetailAttributes, CreationDetail } from './types'
import {State} from '@common/enums'

class Detail extends Model<DetailAttributes, CreationDetail> {}

Detail.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendorCode: {
        type: DataTypes.STRING,
        allowNull: false,
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
    state: {
        type: DataTypes.ENUM(State.NEW, State.SECOND_HAND),
        allowNull: false
    },
}, { 
    sequelize,
    tableName: 'details',
    updatedAt: false
 })


export default Detail
