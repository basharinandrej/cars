import Brand from './brand'
import Model from './model'
import Detail from './detail'
import Category from './category'


Brand.hasMany(Model, {foreignKey: 'brandId'})
Model.belongsTo(Brand, {foreignKey: 'brandId'})


Model.hasMany(Detail, {foreignKey: 'modelId'})
Detail.belongsTo(Model, {foreignKey: 'modelId'})

Category.hasMany(Detail, {foreignKey: 'categoryId'})
