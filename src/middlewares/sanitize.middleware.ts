import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        
        for (const key in req.body) {
            console.log("req", key)
            if (req.body.hasOwnProperty(key) && typeof req.body[key] === 'string') {
                req.body[key] = xss(req.body[key]);
            }
        }
    }
    next(); 
};