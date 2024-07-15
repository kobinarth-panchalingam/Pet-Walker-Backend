import { logger } from '../utils/logger';

import { NextFunction, Request, Response } from 'express';
import { GraphQLFormattedError } from 'graphql';

const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
  logger.error( err.stack );

  const statusCode = err.statusCode || 500;
  const errorMessage = statusCode === 500 ? 'Internal Server Error' : err.message;

  res.status( statusCode ).json( {
    error: true,
    message: errorMessage
  } );
};

const formatError = ( formattedError:GraphQLFormattedError, error: unknown ) => {
  if ( formattedError.extensions.code === 'INTERNAL_SERVER_ERROR' ) {
    console.log( formattedError );
    return {
      ...formattedError,
      message: 'Internal Server Error'
    };
  }
  return formattedError;
};

export { errorHandler, formatError };

