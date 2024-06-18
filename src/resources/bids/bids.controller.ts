import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction, Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import BidService from './bids.service';
import Bid from '@/utils/interfaces/bid.interface';
import accessMiddleware from '../../middleware/acces.middleware';
class BidController implements Controller {
    public path = '/bids';
    public router = Router();
    private BidService = new BidService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/getall`,
            accessMiddleware,
            this.getAllBids,
        );
        this.router.post(`${this.path}/create`, this.createBid);
        this.router.get(`${this.path}/:id`, this.getBid);
        this.router.patch(`${this.path}/:id`, this.updateBid);
        this.router.delete(`${this.path}/:id`, this.deleteBid);
    }
    private getAllBids = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const bids = await this.BidService.getAllBids();
            res.json(bids);
        } catch (error) {
            next(new HttpException(400, 'Cannot get bids'));
        }
    };
    private createBid = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const bidData: Bid = req.body;
            const bid = await this.BidService.createBid(bidData);
            res.json(bid);
        } catch (error) {
            next(new HttpException(400, 'Cannot create bid'));
        }
    };

    private getBid = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { id } = req.params;
        try {
            const bid = await this.BidService.getBid({ id: id });
            res.json(bid);
        } catch (error) {
            next(new HttpException(400, 'Cannot get bid'));
        }
    };
    private updateBid = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { id } = req.params;
        try {
            const bidData: Bid = req.body;
            const bid = await this.BidService.updateBid({ id: id }, bidData);
            res.json(bid);
        } catch (error) {
            next(new HttpException(400, 'Cannot update bid'));
        }
    };
    private deleteBid = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { id } = req.params;
        try {
            const bid = await this.BidService.deleteBid({ id: id });
            res.json(bid);
        } catch (error) {
            next(new HttpException(400, 'Cannot delete bid'));
        }
    };
}
export default BidController;
