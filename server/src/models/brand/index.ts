import {Model as ModelSequelize, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import {BrandAttributes, BrandCreation} from './types'


class Brand extends ModelSequelize<BrandAttributes, BrandCreation> {}

Brand.init({
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
  tableName: 'brands', 
  updatedAt: false,
  hooks: {
    afterCreate: (record) => {
      delete record.dataValues.createdAt
    }
  }
})


export default Brand
