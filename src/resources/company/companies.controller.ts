import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import CompanyService from './companies.service';
import Company from '@/utils/interfaces/company.interface';
import HttpException from '@/utils/exceptions/http.exception';
class CompanyController implements Controller {
    public path = '/companies';
    public router = Router();
    private CompanyService = new CompanyService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(`${this.path}/getall`, this.getAllCompanies);
        this.router.post(`${this.path}/create`, this.createCompany);
        this.router.get(`${this.path}/:id`, this.getCompany);
        this.router.patch(`${this.path}/:id`, this.updateCompany);
        this.router.delete(`${this.path}/:id`, this.deleteCompany);
    }
    private getAllCompanies = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const companies = await this.CompanyService.getAllCompanies();
            console.log(companies);
            res.json(companies);
        } catch (error) {
            next(new HttpException(400, 'Cannot get companies'));
        }
    };
    private createCompany = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const company = await this.CompanyService.createCompany(req.body);
            res.json(company);
        } catch (error) {
            next(new HttpException(400, 'Cannot create company'));
        }
    };
    private getCompany = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const company = await this.CompanyService.getCompanyById(
                req.params.id,
            );
            res.json(company);
        } catch (error) {
            next(new HttpException(400, 'Cannot get company'));
        }
    };
    private updateCompany = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const company = await this.CompanyService.updateCompany(
                req.params.id,
                req.body,
            );
            res.json(company);
        } catch (error) {
            next(new HttpException(400, 'Cannot update company'));
        }
    };
    private deleteCompany = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const company = await this.CompanyService.deleteCompany(
                req.params.id,
            );
            res.json(company);
        } catch (error) {
            next(new HttpException(400, 'Cannot delete company'));
        }
    };
}
export default CompanyController;
