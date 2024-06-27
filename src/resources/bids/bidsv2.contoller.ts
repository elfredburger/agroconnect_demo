import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction, Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import BidService from './bids.service';
import Bid from '@/resources/bids/bid.interface';
import accessMiddleware from '../../middleware/acces.middleware';
import authenticatedMiddleware from '../../middleware/authenticated.middleware';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './bids.validation';
class BidControllerv2 implements Controller {
    public path = '/bidsv2';
    public router = Router();
    private BidService = new BidService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`${this.path}/:id`, this.getBid);
        this.router.patch(`${this.path}/:id`, this.updateBid);
        this.router.delete(`${this.path}/:id`, this.deleteBid);
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            this.createBid,
        );
        this.router.get(
            `${this.path}/getall`,

            this.getAllBids,
        );
        this.router.get(
            `${this.path}/lot=:lot_id/getall`, //get all bids from a lot
            this.getLotBids,
        );

        this.router.get(
            `${this.path}/lot=:lot_id/company=:company_id/getall`, //get all bids from a lot by a certain company

            this.getCompanyLotBids,
        );

        this.router.get(
            `${this.path}/user/getall`, //get all bids from a user

            this.getUserBids,
        );

        this.router.get(
            `${this.path}/lot=:lot_id/user/getall`, //get all bids from a lot by a certain user

            this.getLotUserBids,
        );

        this.router.get(
            `${this.path}/company=:company_id/getall`, //get all bids from a company
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
            next(error);
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
            next(error);
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
            next(error);
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
            next(error);
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
            next(error);
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
            next(error);
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
            next(error);
        }
    };

    private getBid = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { id } = req.params;
        console.log(id);
        try {
            const bid = await this.BidService.getBid({ id: id });
            res.json(bid);
        } catch (error) {
            next(error);
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
            next(error);
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
            next(error);
        }
    };
}
export default BidControllerv2;
