import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction, Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import LotService from './lot.service';
import Lot from '@/utils/interfaces/lot.interface';
class LotController implements Controller {
    public path = '/lots';
    public router = Router();
    private lotService = new LotService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`${this.path}/getall`, this.getAllLots);
        this.router.post(`${this.path}/create`, this.createLot);
        this.router.get(`${this.path}/:id`, this.getLot);
        this.router.patch(`${this.path}/:id`, this.updateLot);
        this.router.delete(`${this.path}/:id`, this.deleteLot);
        this.router.get(`${this.path}/company/:id`, this.getLotsByCompanyId);
        this.router.get(`${this.path}/user/:id/`, this.getLotsByUserId);
    }
    private getAllLots = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const lots = await this.lotService.getAllLots();
            res.json(lots);
        } catch (error) {
            next(new HttpException(400, 'Cannot get lots'));
        }
    };
    private createLot = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const lotData: Lot = req.body;

            const lot = await this.lotService.createLot(lotData);
            res.json(lot);
        } catch (error) {
            next(new HttpException(400, 'Cannot create lot'));
        }
    };
    private getLot = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const lot = await this.lotService.getLots({ id: id });
            res.json(lot);
        } catch (error) {
            next(new HttpException(400, 'Cannot get lot'));
        }
    };
    private updateLot = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const lotData: Lot = req.body;
            const id = req.params.id;
            const lot = await this.lotService.updateLot({ id: id }, lotData);
            res.json(lot);
        } catch (error) {
            next(new HttpException(400, 'Cannot update lot'));
        }
    };
    private deleteLot = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const lot = await this.lotService.deleteLot({ id: id });
            res.json(lot);
        } catch (error) {
            next(new HttpException(400, 'Cannot delete lot'));
        }
    };
    private getLotsByCompanyId = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const lots = await this.lotService.getLots({ id: id });
            res.json(lots);
        } catch (error) {
            next(new HttpException(400, 'Cannot get lots'));
        }
    };
    private getLotsByUserId = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const lots = await this.lotService.getLots({ id: id });
            res.json(lots);
        } catch (error) {
            next(new HttpException(400, 'Cannot get lots'));
        }
    };
}
export default LotController;
