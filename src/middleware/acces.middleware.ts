import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getFromDb } from '@/utils/scripts/sqlQueries';
async function accessMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | Error | void> {
    try {
        const accesuser = await getFromDb(
            { user_id: req.user[0].id, company_id: req.params.company_id }, //not tested
            'user_company_permissions',
        );
        // get user acces from db by user id (from token) and company id from params

        if (accesuser.length == 0) {
            throw new Error('Access denied');
        }

        const accesendpoint = await getFromDb(
            { name: req.path.replace(/\d/g, '') },
            'company_permissions',
        ); // get enpoint acces permission from req.path 0010

        if (accesendpoint.length == 0) {
            throw new Error('Access denied');
        }
        const accesrole = accesuser[0].role;

        if ((accesendpoint[0].bit & accesrole) != 1) {
            throw new Error('Access denied');
        }
        next();
    } catch (err) {
        return next(err);
    }
}

export default accessMiddleware;
