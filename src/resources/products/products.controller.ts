import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import ProductsService from './products.service';
import HttpException from '@/utils/exceptions/http.exception';
import Company from '@/resources/company/company.interface';
import validationMiddleware from '../../middleware/validation.middleware';
import validation from './products.validation';
class ProductsController implements Controller {
    public path = '/products';
    public router = Router();
    public productsService = new ProductsService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.getProducts);
        this.router.get(`${this.path}/:id`, this.getProduct);
        this.router.delete(`${this.path}/:id`, this.deleteProduct);
        this.router.patch(`${this.path}/:id`, this.updateProduct);
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validation.create),
            this.createProduct,
        );
    }

    private getProducts = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const products = await this.productsService.getAllProducts();
            res.status(200).send(products);
        } catch (error: any) {
            next(error);
        }
    };

    private getProduct = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.productsService.getProduct({
                id: req.params.id,
            });
            res.status(200).send(product);
        } catch (error: any) {
            next(error);
        }
    };

    private deleteProduct = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.productsService.deleteProduct({
                id: req.params.id,
            });
            res.status(200).send(product);
        } catch (error: any) {
            next(error);
        }
    };

    private updateProduct = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.productsService.updateProduct(
                { id: req.params.id },
                req.body,
            );
            res.status(200).send(product);
        } catch (error: any) {
            next(error);
        }
    };

    private createProduct = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.productsService.createProduct(req.body);
            res.status(200).send(product);
        } catch (error: any) {
            next(error);
        }
    };
}
export default ProductsController;
