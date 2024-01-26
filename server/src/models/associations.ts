import Brand from './brand'
import Model from './model'

import Detail from './detail'
import DetailCategory from './detail/detail-category'
import DetailAddress from './detail/detail-address'
import DetailPhoto from './detail/detail-photo'

import Car from './car'
import Token from './user/token'
import User from './user'
import Service from './service'
import ServiceCategory from './service/service-category'
import Request from './request'
import Organization from './organization'
import Post from './organization/post'


Brand.hasMany(Model, {foreignKey: 'brandId'})
Model.belongsTo(Brand, {foreignKey: 'brandId'})


Model.hasMany(Detail, {foreignKey: 'modelId'})
Detail.belongsTo(Model, {foreignKey: 'modelId'})


DetailCategory.hasMany(Detail, {foreignKey: 'detailCategoryId'})
Detail.belongsTo(DetailCategory, {foreignKey: 'detailCategoryId'})


DetailAddress.hasMany(Detail, {foreignKey: 'detailAddressId'})
Detail.belongsTo(DetailAddress, {foreignKey: 'detailAddressId'})


DetailPhoto.hasMany(Detail, {foreignKey: 'detailPhotoId'})
Detail.belongsTo(DetailPhoto, {foreignKey: 'detailPhotoId'})


User.hasMany(Detail, {foreignKey: 'userId'})
Detail.belongsTo(User, {foreignKey: 'userId'})


User.hasOne(Token, {foreignKey: 'userId'})
Token.belongsTo(User, {foreignKey: 'userId'})


User.hasMany(Car, {foreignKey: 'userId'})
Car.belongsTo(User, {foreignKey: 'userId'})


User.hasMany(Request, {foreignKey: 'senderId'})
Request.belongsTo(User, {foreignKey: 'senderId'})


Service.hasMany(Request, {foreignKey: 'serviceId'})
Request.belongsTo(Service, {foreignKey: 'serviceId'})


Organization.hasMany(Request, {foreignKey: 'recipientId'})
Request.belongsTo(Organization, {foreignKey: 'recipientId'})


Organization.hasMany(Service, {foreignKey: 'organizationId'})
Service.belongsTo(Organization, {foreignKey: 'organizationId'})


Organization.hasMany(Post, {foreignKey: 'organizationId'})
Post.belongsTo(Organization, {foreignKey: 'organizationId'})


ServiceCategory.hasMany(Service, {foreignKey: 'serviceCategoryId'})
Service.belongsTo(ServiceCategory, {foreignKey: 'serviceCategoryId'})


