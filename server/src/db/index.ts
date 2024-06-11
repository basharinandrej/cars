import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config()

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST} = process.env

function connectDataBase(): Sequelize | null {
  if(DB_NAME && DB_USERNAME && DB_PASSWORD) {
    return new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      dialect: 'postgres'
    });
  } 
  return null
}



export const instanceSequelize = connectDataBase()
