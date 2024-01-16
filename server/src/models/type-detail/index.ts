import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {TypeDetailAttributes, TypeDetailCreation} from './types'


class TypeDetail extends Model<TypeDetailAttributes, TypeDetailCreation> {}

TypeDetail.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, tableName: 'type-detail', updatedAt: false })

export default TypeDetail
