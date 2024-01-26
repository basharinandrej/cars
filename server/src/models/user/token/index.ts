import {instanceSequelize as sequelize} from '@db/index'
import { Model, DataTypes } from 'sequelize'
import {TokenAttributes, TokenCreation} from './types'

class Token extends Model<TokenAttributes, TokenCreation> {}

Token.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fingerPrint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{ sequelize, tableName: 'tokens', updatedAt: false })

export default Token