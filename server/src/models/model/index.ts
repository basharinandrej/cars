import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {ModelAttributes, ModelCreation} from './types'


class Model extends ModelSequelize<ModelAttributes, ModelCreation> {}

sequelize && Model.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { 
  sequelize,
  tableName: 'models', 
  updatedAt: false,
  hooks: {
    afterCreate: (record) => {
      delete record.dataValues.createdAt
    }
  }
})

export default Model
