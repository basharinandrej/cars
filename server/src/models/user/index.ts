import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {UserAttributes, UserCreation} from './types'
import {UserRoles} from '@common/enums'

class User extends ModelSequelize<UserAttributes, UserCreation> {}

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
    avatarId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM(UserRoles.ADMIN, UserRoles.MODERATOR, UserRoles.PERSON),
        allowNull: false
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
  tableName: 'users',
  updatedAt: false
})

export default User