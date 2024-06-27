import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import RegionService from './region.service';
import HttpException from '@/utils/exceptions/http.exception';

class RegionController implements Controller {
    public path = '/regions';
    public router = Router();
    private RegionService = new RegionService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.getRegions);
    }

    private getRegions = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const regions = await this.RegionService.getRegions();
            res.status(200).json({ regions });
        } catch (error: any) {
            next(error);
        }
    };
}
export default RegionController;
