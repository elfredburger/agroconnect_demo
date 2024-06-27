import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import { CompanyPermissionService } from './company-permissions.service';
import HttpException from '@/utils/exceptions/http.exception';

class CompanyPermissionController implements Controller {
    public path = '/permissions';
    public router = Router();
    private CompanyPermissionService = new CompanyPermissionService();
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}/get-all`, this.getAllPermissions);
        this.router.patch(
            `${this.path}/:companyid/:userid`,
            this.updatePermission,
        );
        this.router.get(
            `${this.path}/user-permission/:id`,
            this.getUserPermissions,
        );
        this.router.get(`${this.path}/:companyid`, this.getCompanyPermissions);
        this.router.get(
            `${this.path}/:companyid/:userid`,
            this.getUserPermissionsByCompany,
        );
        this.router.delete(
            `${this.path}/:companyid/:userid`,
            this.deletePermission,
        );
        this.router.post(`${this.path}/create`, this.createPermission);
    }

    private getAllPermissions = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const permissions =
                await this.CompanyPermissionService.getAllPermissions();
            res.json(permissions);
        } catch (error) {
            next(new HttpException(400, 'Cannot get permissions'));
        }
    };

    private updatePermission = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { userid, companyid } = req.params;
            const permission = req.body;

            const updatedPermission =
                await this.CompanyPermissionService.updatePermission(
                    {
                        user_id: userid,
                        company_id: companyid,
                    },
                    permission,
                );
            res.json(updatedPermission);
        } catch (error) {
            next(new HttpException(400, 'Cannot update permission'));
        }
    };

    private getCompanyPermissions = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { companyid } = req.params;
            const permissions =
                await this.CompanyPermissionService.getPermissions({
                    company_id: companyid,
                });
            res.json(permissions);
        } catch (error) {
            next(new HttpException(400, 'Cannot get permissions'));
        }
    };

    private getUserPermissions = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { userid } = req.params;
            const permissions =
                await this.CompanyPermissionService.getPermissions({
                    user_id: userid,
                });
            res.json(permissions);
        } catch (error) {
            next(error);
        }
    };

    private getUserPermissionsByCompany = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { companyid, userid } = req.params;
            const permissions =
                await this.CompanyPermissionService.getPermissions({
                    company_id: companyid,
                    user_id: userid,
                });
            res.json(permissions);
        } catch (error) {
            next(error);
        }
    };

    private deletePermission = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { userid, companyid } = req.params;
            await this.CompanyPermissionService.deletePermission({
                user_id: userid,
                company_id: companyid,
            });
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    };

    private createPermission = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const permission = req.body;
            const createdPermission =
                await this.CompanyPermissionService.createPermission(
                    permission,
                );
            res.json(createdPermission);
        } catch (error) {
            next(error);
        }
    };
}
export default CompanyPermissionController;
