import { Request, Response, NextFunction } from 'express';
import token from '@/utils/token';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import { getFromDb } from '@/utils/scripts/sqlQueries';
import jwt from 'jsonwebtoken';

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | Error | void> {
    const bearer = req.headers.authorization as string;
    try {
        if (!bearer || !bearer.startsWith('Bearer ')) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        const accessToken = bearer.split('Bearer ')[1].trim();

        const payload: Token | jwt.JsonWebTokenError =
            await token.verifyToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, payload.message));
        }
        const user = await getFromDb({ token: accessToken }, 'users');
        if (user.length === 0) {
            return next(new HttpException(401, 'User not Found'));
        }
        user[0].password = '';
        req.user = user; //тут не понятно с типами и как это исправить
        next();
    } catch (error) {
        next(error);
    }
}
export default authenticatedMiddleware;
