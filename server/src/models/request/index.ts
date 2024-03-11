import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {RequestAttributes, CreationRequest, StatusRequest} from './types'


class Request extends Model<RequestAttributes, CreationRequest> {}

Request.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(StatusRequest.APPROVED, StatusRequest.DECLINED, StatusRequest.IN_VIEWING, StatusRequest.FINISHED),
        allowNull: false
    }
}, { 
    sequelize,
    tableName: 'requests',
    updatedAt: false
})

export default Request