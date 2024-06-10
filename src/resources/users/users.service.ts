import User from '@/utils/interfaces/user.interface';
import {
    getAllDb,
    getFromDb,
    createObjectDb,
    deleteFromDb,
    updateObjectDb,
} from '@/utils/scripts/sqlQueries';
import HttpException from '../../utils/exceptions/http.exception';
class UserService {
    public async getAllUsers(): Promise<User[]> {
        const users = await getAllDb('users');
        return users;
    }
    public async updateUser(param: object, user: User): Promise<string> {
        const updatedUser = await updateObjectDb(param, user, 'users');
        if (!updatedUser) throw new HttpException(409, 'User not found');
        return updatedUser;
    }
    public async getUser(param: object): Promise<User> {
        const user = await getFromDb(param, 'users');
        if (!user) throw new HttpException(409, 'User not found');
        user.password = '******';
        return user;
    }
    public async deleteUser(param: object): Promise<string> {
        const deletedUser = await deleteFromDb(param, 'users');
        if (!deletedUser) throw new HttpException(409, 'User not found');
        return deletedUser;
    }
    public async createUser(user: User): Promise<string> {
        const createdUser = await createObjectDb(user, 'users');
        return createdUser;
    }
}
export default UserService;
