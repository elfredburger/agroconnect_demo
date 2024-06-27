import User from '@/resources/users/user.interface';
import token from '../../utils/token';
import HttpException from '../../utils/exceptions/http.exception';
import bcrypt from 'bcryptjs';
import Token from '../../utils/interfaces/token.interface';
import UserService from '../users/users.service';
class AuthService {
    private user = new UserService();

    public async refresh(tokenInfo: string): Promise<User | Error> {
        const user = await this.user.getUser({ token: tokenInfo });
        if (!user) {
            throw new Error('User not found');
        }
        const newToken = await token.createToken(user[0], '7d');
        await this.user.updateToken({ token: tokenInfo }, newToken);
        const newUser = await this.user.getUser({ token: newToken });
        newUser[0].password = '';
        return newUser[0];
    }
    public async login(email: string, password: string): Promise<User | Error> {
        const userInfo = await this.user.getUser({ email: email });
        if (!userInfo) {
            throw new Error('User not found');
        }
        if (await bcrypt.compare(password, userInfo[0].password)) {
            await this.user.updateToken(
                { email: email },
                token.createToken(userInfo[0], '7d'),
            );
            const updatedUser = await this.user.getUser({
                email: email,
            });
            updatedUser[0].password = '';
            return updatedUser[0];
        } else {
            throw new Error('Wrong password');
        }
    }
    public async logout(token: string): Promise<String | Error> {
        const user = await this.user.getUser({ token: token });
        if (!user) {
            throw new Error('User not found');
        }
        await this.user.updateToken({ token: token }, '');
        return 'User logged out';
    }
    public async verify(tokenInfo: string): Promise<Token | Error> {
        const verify = await token.verifyToken(tokenInfo);
        return verify;
    }
}
export default AuthService;
