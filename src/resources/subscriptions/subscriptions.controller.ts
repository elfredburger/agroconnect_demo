import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import DstuService from './subscriptions.service';
import HttpException from '@/utils/exceptions/http.exception';

class SubscriptionsController implements Controller {
    public path = '/subscriptions';
    public router = Router();
    private DstuService = new DstuService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(this.path, this.getAllSubscriptions);
    }

    private getAllSubscriptions = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const subscriptions = await this.DstuService.getAllSubscriptions();
            return res.status(200).json(subscriptions);
        } catch (error) {
            next(error);
        }
    };
}
export default SubscriptionsController;
