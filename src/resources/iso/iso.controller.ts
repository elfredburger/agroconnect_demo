import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import IsoService from './iso.service';
import HttpException from '@/utils/exceptions/http.exception';

class IsoController implements Controller {
    public path = '/iso';
    public router = Router();
    private IsoService = new IsoService();

    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(this.path, this.getAllIso);
    }

    private getAllIso = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const iso = await this.IsoService.getiso();
            res.json(iso);
        } catch (error) {
            next(error);
        }
    };
}
export default IsoController;
