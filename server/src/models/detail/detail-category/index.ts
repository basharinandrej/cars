import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {DetailCategoryAttributes, DetailCategoryCreation} from './types'

class DetailCategory extends Model<DetailCategoryAttributes, DetailCategoryCreation> {}

sequelize && DetailCategory.init({
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
    updatedAt: false,
    hooks: {
        afterCreate: (record) => {
            delete record.dataValues.createdAt
        }
    }
})

export default DetailCategory