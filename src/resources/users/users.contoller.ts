import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import UserService from './users.service';
import User from '@/resources/users/user.interface';
import validationMiddleware from '../../middleware/validation.middleware';
import validation from './user.validation';
class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}/getall`, this.getAllUsers);
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validation.create),
            this.createUser,
        );
        this.router.delete(`${this.path}/:id`, this.deleteUser);
        this.router.get(`${this.path}/:id`, this.getUser);
        this.router.patch(
            `${this.path}/:id`,
            validationMiddleware(validation.update),
            this.updateUser,
        );
    }
    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const users = await this.UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    };
    private updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const userData: User = req.body;
            const user = await this.UserService.updateUser(
                { id: id },
                userData,
            );
            res.json(user);
        } catch (error) {
            next(error);
        }
    };
    private getUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;

            const user = await this.UserService.getUser({ id: id });
            res.json(user);
        } catch (error) {
            next(error);
        }
    };
    private deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const result = await this.UserService.deleteUser({ id: id });
            res.json(result);
        } catch (error) {
            next(error);
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
            next(error);
        }
    };
}
export default UserController;
