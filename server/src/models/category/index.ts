import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {CategoryAttributes, CreationCategory} from './types'

class Category extends Model<CategoryAttributes, CreationCategory> {}

Category.init({
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
    tableName: 'details',
    updatedAt: false
})

export default Category