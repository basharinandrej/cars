import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {OrganizationAttributes, OrganizationCreation} from './types'

class Organization extends ModelSequelize<OrganizationAttributes, OrganizationCreation> {}

Organization.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    avatarId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
  sequelize, 
  tableName: 'organizations',
  updatedAt: false
})

export default Organization