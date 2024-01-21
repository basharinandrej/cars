import Brand from './brand'
import Model from './model'
import PartsOfCar from './parts-of-car'
import TypeDetail from './type-detail'
import Detail from './detail'


Brand.hasMany(Model, {foreignKey: 'brandId'})
Model.belongsTo(Brand, {foreignKey: 'brandId'})


PartsOfCar.hasMany(TypeDetail, {foreignKey: 'partsOfCarId'})
TypeDetail.belongsTo(PartsOfCar, {foreignKey: 'partsOfCarId'})


TypeDetail.hasMany(Detail,  {foreignKey: 'typeDetailId'})
Detail.belongsTo(TypeDetail,  {foreignKey: 'typeDetailId'})

Model.hasMany(Detail,  {foreignKey: 'modelId'})
Detail.belongsTo(Model,  {foreignKey: 'modelId'})