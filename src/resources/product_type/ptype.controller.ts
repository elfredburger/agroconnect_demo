import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import ProductTypeService from './ptype.service';
import HttpException from '@/utils/exceptions/http.exception';

class ProductTypeController implements Controller {
    public path = '/product_types';
    public router = Router();
    private ProductTypeService = new ProductTypeService();

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
    ): Promise<void> => {
        try {
            const ptypes = await this.ProductTypeService.getTypes();
            res.status(200).json({ ptypes });
        } catch (error: any) {
            next(error);
        }
    };
}
export default ProductTypeController;
