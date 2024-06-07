import User from '@/utils/interfaces/user.interface';
import {
    getAllDb,
    getbyIdDb,
    createObjectDb,
    deletebyIdDb,
    updateObjectDb,
} from '@/utils/scripts/sqlQueries';
import HttpException from '../../utils/exceptions/http.exception';
class UserService {
    public async getAllUsers(): Promise<User[]> {
        const users = await getAllDb('users');
        return users;
    }
    public async updateUser(id: string, user: User): Promise<String> {
        const updatedUser = await updateObjectDb(id, user, 'users');
        if (!updatedUser) throw new HttpException(409, 'User not found');
        return updatedUser;
    }
    public async getUser(id: string): Promise<User> {
        const user = await getbyIdDb(id, 'users');
        if (!user) throw new HttpException(409, 'User not found');
        user.password = '******';
        return user;
    }
    public async deleteUser(id: string): Promise<String> {
        const deletedUser = await deletebyIdDb(id, 'users');
        if (!deletedUser) throw new HttpException(409, 'User not found');
        return deletedUser;
    }
    public async createUser(user: User): Promise<String> {
        const createdUser = await createObjectDb(user, 'users');
        return createdUser;
    }
}
export default UserService;
