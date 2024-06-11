import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import CompTypeService from './comptype.service';
import HttpException from '@/utils/exceptions/http.exception';
import CompType from '@/utils/interfaces/comptype.interface';

class CompTypeController implements Controller {
    public path = '/comptypes';
    public router = Router();
    private CompTypeService = new CompTypeService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(this.path, this.getAllCompTypes);
    }

    private getAllCompTypes = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const compTypes = await this.CompTypeService.getAllCompTypes();
            res.json(compTypes);
        } catch (error) {
            next(new HttpException(400, 'Cannot get comp types'));
        }
    };
}

export default CompTypeController;
