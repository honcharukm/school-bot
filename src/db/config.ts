import { Dialect, Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT || 3306
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(
    dbName, 
    dbUser, 
    dbPassword, 
    {
        host: dbHost,
        port: +dbPort,
        dialect: dbDriver
    }
)

export default sequelizeConnection