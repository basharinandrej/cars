import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {DetailWearAttributes, DetailWearCreation} from './types'

class DetailWear extends ModelSequelize<DetailWearAttributes, DetailWearCreation> {}

DetailWear.init({
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
    allowNull: false
  }
}, { 
  sequelize, 
  tableName: 'detail-wears',
  updatedAt: false
})

export default DetailWear