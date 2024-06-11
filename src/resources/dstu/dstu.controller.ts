import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import DstuService from './dstu.service';
import HttpException from '@/utils/exceptions/http.exception';

class DstuController implements Controller {
    public path = '/dstu';
    public router = Router();
    private DstuService = new DstuService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(this.path, this.getAllDStu);
    }

    private getAllDStu = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const dstu = await this.DstuService.findAll();
            res.json(dstu);
        } catch (error) {
            next(new HttpException(400, 'Cannot get dstu'));
        }
    };
}
export default DstuController;
