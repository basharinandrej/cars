import {Model, DataTypes} from 'sequelize'
import {instanceSequelize as sequelize} from '@db/index'
import { PostAttributes, CreationPost } from './types'


class Post extends Model<PostAttributes, CreationPost> {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    offer: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    sequelize,
    tableName: 'posts',
    updatedAt: false
 })


export default Post
