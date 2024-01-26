import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {DetailAddressAttributes, DetailAddressCreation} from './types'

class DetailAddress extends ModelSequelize<DetailAddressAttributes, DetailAddressCreation> {}

DetailAddress.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  house: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
}, { 
  sequelize, 
  tableName: 'detail-addresses',
  updatedAt: false
})

export default DetailAddress