import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {OrganizationAttributes, OrganizationCreation} from './types'
import { Bans, StatusOrganization } from '@common/enums'

class Organization extends ModelSequelize<OrganizationAttributes, OrganizationCreation> {}

sequelize && Organization.init({
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
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ban: {
      type: DataTypes.ENUM(Bans.Constant, Bans.Null, Bans.Temporary, Bans.Warning),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(StatusOrganization.Busy, StatusOrganization.Free, StatusOrganization.Waiting),
      allowNull: false
    }
}, { 
  sequelize, 
  tableName: 'organizations',
  updatedAt: false,
  hooks: {
    afterCreate: (record) => {
        //@ts-ignore
        delete record.dataValues.password
        delete record.dataValues.createdAt
    }
  }
})

export default Organization