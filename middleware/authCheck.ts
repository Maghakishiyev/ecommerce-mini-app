import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../configs';

interface DecodedUser extends JwtPayload {
    userId: string;
    iat: number;
    exp: number;
}

export interface ReqWithUser extends Request {
    user?: DecodedUser;
}

export const authCheck = (
    req: ReqWithUser,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, config.jwt_secret, (err, user) => {
        if (err) return res.sendStatus(403); // Forbiden
        if (isDecodedUser(user)) {
            req.user = user;
            next();
        } else {
            res.sendStatus(403); // Forbidden, as the token structure is not as expected
        }
    });
};

function isDecodedUser(object: any): object is DecodedUser {
    return object && typeof object === 'object' && 'userId' in object;
}
