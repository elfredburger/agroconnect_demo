import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import IncotermsService from './incoterms.service';
import HttpException from '@/utils/exceptions/http.exception';

class IncotermsController implements Controller {
    public path = '/incoterms';
    public router = Router();
    private IncotermsService = new IncotermsService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getIncoterms);
    }

    private getIncoterms = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const incoterms = await this.IncotermsService.getIncoterms();
            res.status(200).json({ incoterms });
        } catch (error) {
            next(error);
        }
    };
}
export default IncotermsController;
