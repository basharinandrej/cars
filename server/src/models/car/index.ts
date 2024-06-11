import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {CarAttributes} from './types'

class Car extends Model<CarAttributes, CarAttributes> {}

sequelize && Car.init({
    vinCode: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.DATE,
        
        allowNull: false
    }
}, { 
    sequelize,
    tableName: 'cars',
    updatedAt: false
})

export default Car