import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/response';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const response = new Responses(false, 'Internal Server Error', req.method, 500, null);
  res.status(500).json(response); // Send a 500 response
  return;
};

export default errorHandler;