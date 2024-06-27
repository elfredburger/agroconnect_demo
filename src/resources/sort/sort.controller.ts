import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import Sort from './sort.service';
import HttpException from '@/utils/exceptions/http.exception';

class SortController implements Controller {
    public path = '/sorts';
    public router = Router();
    public sort = new Sort();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(this.path, this.sortData);
    }

    private sortData = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const result = await this.sort.getAllSorts();
            res.status(200).send(result);
        } catch (error: any) {
            next(error);
        }
    };
}
export default SortController;
