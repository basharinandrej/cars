import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import { DetailPhotoAttributes, CreationDetailPhoto } from './types'


class DetailPhoto extends Model<DetailPhotoAttributes, CreationDetailPhoto> {}

DetailPhoto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { 
    sequelize,
    tableName: 'detail-photos',
    updatedAt: false
 })


export default DetailPhoto
