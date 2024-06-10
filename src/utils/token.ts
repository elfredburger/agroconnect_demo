import jwt from 'jsonwebtoken';
import User from '@/utils/interfaces/user.interface';
import Token from '@/utils/interfaces/token.interface';
export const createToken = (user: User, duration?: string | number): string => {
    if (duration) {
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: duration,
        });
    }
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string,
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) {
                    return reject(err);
                }
                resolve(payload as Token);
            },
        );
    });
};
export default { createToken, verifyToken };
