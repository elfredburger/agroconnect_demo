import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import DstuService from './measure.service';
import HttpException from '@/utils/exceptions/http.exception';

class MeasureController implements Controller {
    public path = '/measures';
    public router = Router();
    private dstuService = new DstuService();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(`${this.path}`, this.getMeasure);
    }

    private getMeasure = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const measure = await this.dstuService.getAllMeasures();
            res.status(200).json({ measure });
        } catch (error) {
            next(error);
        }
    };
}
export default MeasureController;
