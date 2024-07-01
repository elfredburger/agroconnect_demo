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
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };
}

export default validationMiddleware;
