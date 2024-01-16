import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {TypeCarAttributes, TypeCarCreation} from './types'


class TypeCar extends ModelSequelize<TypeCarAttributes, TypeCarCreation> {}

TypeCar.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
}, { 
  sequelize, 
  tableName: 'type-cars',
  updatedAt: false
})

export default TypeCar