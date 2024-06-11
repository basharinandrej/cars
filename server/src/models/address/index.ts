import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {AddressAttributes, AddressCreation} from './types'

class Address extends ModelSequelize<AddressAttributes, AddressCreation> {}

sequelize && Address.init({
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
  tableName: 'addresses',
  updatedAt: false,
  hooks: {
    afterCreate: (record) => {
      delete record.dataValues.createdAt
    }
  }
})

export default Address