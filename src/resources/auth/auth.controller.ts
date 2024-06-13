import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import AuthService from '../../resources/auth/auth.service';
import authenticated from '../../middleware/authenticated.middleware';
class AuthController implements Controller {
    public path = '/auth';
    public router = Router();
    private AuthService = new AuthService();

    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/login`,

            this.login,
        );
        this.router.post(`${this.path}/logout`, authenticated, this.logout);
        this.router.get(`${this.path}/refresh`, authenticated, this.refresh);
    }

    private logout = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            this.AuthService.logout(
                req.headers.authorization?.replace('Bearer ', '') as string,
            );
            res.status(200).json('logged out');
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private refresh = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        const refreshToken = req.headers.authorization?.replace(
            'Bearer ',
            '',
        ) as string;
        try {
            const token = await this.AuthService.refresh(refreshToken);
            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            await authenticated(req, res, next);

            res.status(200).json('Secret data');
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const user = await this.AuthService.login(email, password);
            res.status(200).json({ user });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default AuthController;
