import { UserInput, UserOutput, default as User } from '../models/user'

class UserService {
    async createNewUser(payload: UserInput): Promise<UserOutput> {
        const newUser = await User.create(payload)
        return newUser
    }

    async getUserByChatId(chatId: number): Promise<User | null> {
        const user = await User.findOne({ where: { chatId } })
        return user
    }
}

export default new UserService