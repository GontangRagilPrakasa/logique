import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

const blockedIPs = new Set(['192.0.2.1', '203.0.113.0']);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
});

const blockIPs = (req: Request, res: Response, next: NextFunction) => {
    if (blockedIPs.has(req.ip || '')) {
        return res.status(403).send('Access denied.');
    }
    next();
};

export { limiter, blockIPs };