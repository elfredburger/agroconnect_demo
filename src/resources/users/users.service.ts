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
        if (updatedUser === 'Update to Db failed') {
            throw new HttpException(400, updatedUser);
        }
        return updatedUser;
    }
    public async getUser(param: object): Promise<User[]> {
        const user = await getFromDb(param, 'users');
        if (user.length == 0) throw new HttpException(400, 'User not found');

        return user;
    }
    public async deleteUser(param: object): Promise<string> {
        const deletedUser = await deleteFromDb(param, 'users');
        if (deletedUser === 'Delete from Db failed') {
            throw new HttpException(400, deletedUser);
        }

        return deletedUser;
    }
    public async createUser(user: User): Promise<string> {
        user.password = await bcrypt.hash(user.password, 10);
        const createdUser = await createObjectDb(user, 'users');
        if (createdUser === 'Create to Db failed') {
            throw new HttpException(400, createdUser);
        }
        return createdUser;
    }

    public async updateToken(param: object, token: string): Promise<string> {
        const updatedUser = await updateObjectDb(
            param,
            { token: token },
            'users',
        );
        if (updatedUser === 'Update to Db failed') {
            throw new HttpException(400, updatedUser);
        }

        return updatedUser;
    }
}
export default UserService;
