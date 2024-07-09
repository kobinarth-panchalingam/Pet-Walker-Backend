import { logger } from '../utils/logger';

import { NextFunction, Request, Response } from 'express';

const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
  logger.error( err.stack );

  const statusCode = err.statusCode || 500;
  const errorMessage = statusCode === 500 ? 'Internal Server Error' : err.message;

  res.status( statusCode ).json( {
    error: true,
    message: errorMessage
  } );
};

export { errorHandler };