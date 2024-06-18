import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction, Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import BidService from './bids.service';
import Bid from '@/utils/interfaces/bid.interface';
import accessMiddleware from '../../middleware/acces.middleware';
import authenticatedMiddleware from '../../middleware/authenticated.middleware';
class BidControllerv2 implements Controller {
    public path = '/bidsv2';
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
        this.router.get(`${this.path}/:id`, this.getBid);
        this.router.patch(`${this.path}/:id`, this.updateBid);
        this.router.delete(`${this.path}/:id`, this.deleteBid);
        this.router.post(`${this.path}/create`, this.createBid); // create from body? or from url params

        this.router.get(
            `${this.path}/lot=:lot_id/getall`, //get all bids from a lot
            authenticatedMiddleware,
            accessMiddleware,
            this.getLotBids,
        );

        this.router.get(
            `${this.path}/lot=:lot_id/company=:company_id/getall`, //get all bids from a lot by a certain company
            authenticatedMiddleware,
            accessMiddleware,
            this.getCompanyLotBids,
        );

        this.router.get(
            `${this.path}/user/getall`,

            authenticatedMiddleware,
            accessMiddleware,
            //get all bids from a user
            this.getUserBids,
        );

        this.router.get(
            `${this.path}/lot=:lot_id/user/getall`, //get all bids from a lot by a certain user
            authenticatedMiddleware,
            accessMiddleware,
            this.getLotUserBids,
        );

        this.router.get(
            `${this.path}/company=:company_id/getall`,
            authenticatedMiddleware,
            accessMiddleware, //get all bids from a company
            this.getCompanyBids,
        );
    }
    private getCompanyBids = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { company_id } = req.params;
        try {
            const bids = await this.BidService.getBid({
                company_id: company_id,
            });
            res.json(bids);
        } catch (error) {
            next(new HttpException(400, 'Cannot get bids'));
        }
    };
    private getLotUserBids = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { lot_id } = req.params;
        const user_id = req.user[0].id;
        try {
            const bids = await this.BidService.getBid({
                user_id: user_id,
                lot_id: lot_id,
            });
            res.json(bids);
        } catch (error) {
            next(new HttpException(400, 'Cannot get bids'));
        }
    };
    private getUserBids = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const user_id = req.user[0].id;
        try {
            const bids = await this.BidService.getBid({ user_id: user_id });
            res.json(bids);
        } catch (error) {
            next(new HttpException(400, 'Cannot get bids'));
        }
    };
    private getLotBids = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { lot_id } = req.params;
        try {
            
            const bids = await this.BidService.getBid({ lot_id: lot_id });
            res.json(bids);
        } catch (error) {
            next(new HttpException(400, 'Cannot get bids'));
        }
    };

    private getCompanyLotBids = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { lot_id, company_id } = req.params;
        try {
            const bids = await this.BidService.getBid({
                lot_id: lot_id,
                company_id: company_id,
            });
            res.json(bids);
        } catch (error) {
            next(new HttpException(400, 'Cannot get bids'));
        }
    };
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
export default BidControllerv2;
