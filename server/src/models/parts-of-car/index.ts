import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {PartsOfCarAttributes, PartsOfCarCreation} from './types'


class PartsOfCar extends Model<PartsOfCarAttributes, PartsOfCarCreation> {}

PartsOfCar.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, tableName: 'parts-of-car', updatedAt: false })


export default PartsOfCar
