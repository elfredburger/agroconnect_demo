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
    public async updateUser(id: string, user: User): Promise<string> {
        const updatedUser = await updateObjectDb({ id: id }, user, 'users');
        if (!updatedUser) throw new HttpException(409, 'User not found');
        return updatedUser;
    }
    public async getUser(id: string): Promise<User> {
        const user = await getFromDb({ id: id }, 'users');
        if (!user) throw new HttpException(409, 'User not found');
        user.password = '******';
        return user;
    }
    public async deleteUser(id: string): Promise<string> {
        const deletedUser = await deleteFromDb({ id: id }, 'users');
        if (!deletedUser) throw new HttpException(409, 'User not found');
        return deletedUser;
    }
    public async createUser(user: User): Promise<string> {
        const createdUser = await createObjectDb(user, 'users');
        return createdUser;
    }
}
export default UserService;
