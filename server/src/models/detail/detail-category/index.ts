import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {DetailCategoryAttributes, CreationDetailCategory} from './types'

class DetailCategory extends Model<DetailCategoryAttributes, CreationDetailCategory> {}

DetailCategory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { 
    sequelize,
    tableName: 'detail-categories',
    updatedAt: false
})

export default DetailCategory