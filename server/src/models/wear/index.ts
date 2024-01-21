import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {WearAttributes, WearCreation} from './types'

class Wear extends ModelSequelize<WearAttributes, WearCreation> {}

Wear.init({
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
  tableName: 'wear',
  updatedAt: false
})

export default Wear