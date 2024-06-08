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
        this.router.post(`${this.path}/create`, this.createUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.patch(`${this.path}/:id`, this.updateUser);
    }
    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const users = await this.UserService.getAllUsers();
            console.log(users);
            res.json(users);
        } catch (error) {
            next(new HttpException(400, 'Cannot get users'));
        }
    };
    private updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userId = req.params.id;
            const userData: User = req.body;
            const user = await this.UserService.updateUser(userId, userData);
            res.json(user);
        } catch (error) {
            next(new HttpException(400, 'Cannot update user'));
        }
    };
    private getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userId = req.params.id;
            const user = await this.UserService.getUser(userId);
            res.json(user);
        } catch (error) {
            next(new HttpException(400, 'Cannot get user'));
        }
    };
    private deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userId = req.params.id;
            await this.UserService.deleteUser(userId);
            res.json('user deleted');
        } catch (error) {
            next(new HttpException(400, 'Cannot delete user'));
        }
    };
    private createUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userData: User = req.body;
            const user = await this.UserService.createUser(userData);
            res.json(user);
        } catch (error) {
            next(new HttpException(400, 'Cannot create user'));
        }
    };
}
export default UserController;
