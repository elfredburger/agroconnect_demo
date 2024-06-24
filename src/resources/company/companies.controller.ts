import { NextFunction, Router, Request, Response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import CompanyService from './companies.service';
import HttpException from '@/utils/exceptions/http.exception';
import Company from '@/resources/company/company.interface';
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
            const companyData: Company = req.body;
            const company =
                await this.CompanyService.createCompany(companyData);
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
            const id = req.params.id;
            const company = await this.CompanyService.getCompany({ id: id });
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
            const companyData: Company = req.body;
            const id = req.params.id;
            const company = await this.CompanyService.updateCompany(
                { id: id },
                companyData,
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
            const id = req.params.id;
            const company = await this.CompanyService.deleteCompany({ id: id });
            res.json(company);
        } catch (error) {
            next(new HttpException(400, 'Cannot delete company'));
        }
    };
}

export default CompanyController;
