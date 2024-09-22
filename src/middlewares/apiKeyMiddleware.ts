import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY; 

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).json({
      status: false,
      message: 'Unauthorized: Invalid API Key',
      method: req.method,
      statusCode: 401,
      data: null,
    });
    return
  }

  next(); 
};

export default apiKeyMiddleware;