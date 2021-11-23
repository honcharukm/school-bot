import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

export enum UserRole {
    Student,
    Admin
}

const userRoleArr = 
    Object.keys(UserRole)
    .filter(value => !isNaN(Number(value)))

interface UserAttributes {
    id: number
    chatId: number
    firstName: string
    lastName: string
    role: UserRole
    createdAt?: Date
    updatedAt?: Date 
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public chatId!: number
    public firstName!: string
    public lastName!: string
    public role!: UserRole

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: userRoleArr,
        defaultValue: `${UserRole.Student}`
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection
})

export default User