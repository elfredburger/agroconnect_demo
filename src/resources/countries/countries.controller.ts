import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import DstuService from './countries.service';
import HttpException from '@/utils/exceptions/http.exception';

class CountriesController implements Controller {
    public path = '/countries';
    public router = Router();
    private DstuService = new DstuService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(this.path, this.getAll);
    }

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const countries = await this.DstuService.getAllCountries();
            return res.status(200).json({ countries });
        } catch (error) {
            next(error);
        }
    };
}
export default CountriesController;
