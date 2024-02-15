import Brand from './brand'
import Model from './model'

import Detail from './detail'
import DetailCategory from './detail/detail-category'
import DetailPhoto from './detail/detail-photo'

import Address from './address'
import Car from './car'
import Token from './user/token'
import User from './user'
import OrganizationServiceCategory from './organization-service-category'
import ServiceCategory from './service-category'
import Request from './request'
import Organization from './organization'
import Post from './organization/post'


Brand.hasMany(Model, {foreignKey: 'brandId'})
Model.belongsTo(Brand, {foreignKey: 'brandId'})


Model.hasMany(Detail, {foreignKey: 'modelId'})
Detail.belongsTo(Model, {foreignKey: 'modelId'})


DetailCategory.hasMany(Detail, {foreignKey: 'detailCategoryId'})
Detail.belongsTo(DetailCategory, {foreignKey: 'detailCategoryId'})


Address.hasMany(Detail, {foreignKey: 'addressId'})
Detail.belongsTo(Address, {foreignKey: 'addressId'})


Detail.hasMany(DetailPhoto, {foreignKey: 'detailId'})
DetailPhoto.belongsTo(Detail, {foreignKey: 'detailId'})


User.hasMany(Detail, {foreignKey: 'userId'})
Detail.belongsTo(User, {foreignKey: 'userId'})


User.hasOne(Token, {foreignKey: 'userId'})
Token.belongsTo(User, {foreignKey: 'userId'})


Organization.hasOne(Token, {foreignKey: 'organizationId'})
Token.belongsTo(Organization, {foreignKey: 'organizationId'})


User.hasMany(Car, {foreignKey: 'userId'})
Car.belongsTo(User, {foreignKey: 'userId'})


User.hasMany(Request, {foreignKey: 'senderId'})
Request.belongsTo(User, {foreignKey: 'senderId'})


OrganizationServiceCategory.hasMany(Request, {foreignKey: 'serviceId'})
Request.belongsTo(OrganizationServiceCategory, {foreignKey: 'serviceId'})


Organization.hasMany(Request, {foreignKey: 'recipientId'})
Request.belongsTo(Organization, {foreignKey: 'recipientId'})


Organization.belongsToMany(ServiceCategory, { through: OrganizationServiceCategory, as: 'serviceCategories', foreignKey: 'organizationId' });
ServiceCategory.belongsToMany(Organization, { through: OrganizationServiceCategory, as: 'organizaitons', foreignKey: 'serviceCategoryId' });


Organization.hasMany(Post, {foreignKey: 'organizationId'})
Post.belongsTo(Organization, {foreignKey: 'organizationId'})


Organization.hasMany(Address, {foreignKey: 'organizationId'})
Address.belongsTo(Organization, {foreignKey: 'organizationId'})