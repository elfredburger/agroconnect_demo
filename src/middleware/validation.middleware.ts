import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };
        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions,
            );
            req.body = value;
            next();
        } catch (error: any) {
            next(new HttpException(400, 'email incorrect'));
        }
    };
}

export default validationMiddleware;
