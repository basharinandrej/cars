import Brand from './brand'
import Model from './model'
import PartsOfCar from './parts-of-car'
import TypeCar from './type-car'
import TypeDetail from './type-detail'
import Detail from './detail'


Brand.hasMany(Model, {foreignKey: 'brandId'})
Model.belongsTo(Brand, {foreignKey: 'brandId'})


TypeCar.hasMany(Model, {foreignKey: 'typeCarId'})
Model.belongsTo(TypeCar, {foreignKey: 'typeCarId'})


TypeCar.hasMany(PartsOfCar, {foreignKey: 'typeCarId'})
PartsOfCar.belongsTo(TypeCar, {foreignKey: 'typeCarId'})


PartsOfCar.hasMany(TypeDetail, {foreignKey: 'partsOfCarId'})
TypeDetail.belongsTo(PartsOfCar, {foreignKey: 'partsOfCarId'})


TypeDetail.hasMany(Detail,  {foreignKey: 'typeDetailId'})
Detail.belongsTo(TypeDetail,  {foreignKey: 'typeDetailId'})