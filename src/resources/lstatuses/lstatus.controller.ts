import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import ListingStatusService from './lstatus.service';
import HttpException from '@/utils/exceptions/http.exception';

class ListingStatusController implements Controller {
    public path = '/lstatuses';
    public router = Router();
    private ListingStatusService = new ListingStatusService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.getListingStatuses);
    }

    private getListingStatuses = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const data = await this.ListingStatusService.getstatus();
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };
}
export default ListingStatusController;
