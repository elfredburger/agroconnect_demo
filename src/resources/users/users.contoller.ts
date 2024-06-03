import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import UserService from './users.service';
import User from '@/utils/interfaces/user.interface';
import HttpException from '@/utils/exceptions/http.exception';
class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}/getall`, this.getAllUsers);
    }
    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<User[] | void> => {
        try {
            const users = await this.UserService.getAllUsers();
            console.log(users);
            res.json(users);
        } catch (error) {
            next(new HttpException(400, 'Cannot get users'));
        }
    };
}
export default UserController;
