import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {UserAttributes} from './types'

class User extends ModelSequelize<UserAttributes, any> {}

User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    avatar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('PERSON', 'ORGANIZATION', 'ADMIN', 'MODERATOR'),
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addres: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banType: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, { 
  sequelize, 
  tableName: 'users',
  updatedAt: false
})

export default User