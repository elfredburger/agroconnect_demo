import User from '@/resources/users/user.interface';
import bcrypt from 'bcryptjs';
import {
    getAllDb,
    getFromDb,
    createObjectDb,
    deleteFromDb,
    updateObjectDb,
} from '@/utils/scripts/sqlQueries';
import HttpException from '../../utils/exceptions/http.exception';
import { error } from 'console';
class UserService {
    public async getAllUsers(): Promise<User[]> {
        const users = await getAllDb('users');
        return users;
    }
    public async updateUser(param: object, user: User): Promise<string> {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        const updatedUser = await updateObjectDb(param, user, 'users');

        return updatedUser;
    }
    public async getUser(param: object): Promise<User[]> {
        const user = await getFromDb(param, 'users');
        if (user.length == 0) throw new HttpException(409, 'User not found');

        return user;
    }
    public async deleteUser(param: object): Promise<string> {
        const deletedUser = await deleteFromDb(param, 'users');

        return deletedUser;
    }
    public async createUser(user: User): Promise<string> {
        user.password = await bcrypt.hash(user.password, 10);
        const createdUser = await createObjectDb(user, 'users');
        return createdUser;
    }

    public async updateToken(param: object, token: string): Promise<string> {
        const updatedUser = await updateObjectDb(
            param,
            { token: token },
            'users',
        );
        if (!updatedUser) throw new HttpException(409, 'User not found');
        return updatedUser;
    }
}
export default UserService;
