import User from '@/utils/interfaces/user.interface';
import { getUsers } from '@/utils/scripts/sqlQueries';
import HttpException from '../../utils/exceptions/http.exception';
class UserService {
    public async getAllUsers(): Promise<User[] | any> {
        const users = await getUsers();
        return users;
    }
}
export default UserService;
