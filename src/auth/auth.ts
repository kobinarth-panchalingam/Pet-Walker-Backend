import { LOGIN, REGISTER, VERIFY_TOKEN } from '../constants/routes';
import { prisma } from '../database/prisma';
import { signToken, verifyToken } from '../utils/jwtUtils';
import { logger } from '../utils/logger';

import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'OWNER' | 'WALKER' | 'ADMIN';
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const router = express.Router();

router.post( REGISTER, async( req: RegisterRequest, res: Response, next ) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await prisma.user.findUnique( { where: { email } } );
    if ( existingUser ) {
      return res
        .status( 400 )
        .json( { error: 'A user with this email already exists' } );
    }

    const hashedPassword = await bcrypt.hash( password, 10 );
    const user = await prisma.user.create( {
      data: { email, password: hashedPassword, role, firstName, lastName }
    } );

    const token = signToken( {
      userId: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    } );

    logger.info( `User ${ user.email } registered` );
    res.json( { token } );
  } catch ( error ) {
    next( error );
  }
} );

router.post( LOGIN, async( req: LoginRequest, res: Response, next ) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique( { where: { email } } );
    if ( !user ) {
      return res.status( 401 ).json( { error: 'Invalid credentials' } );
    }

    const valid = await bcrypt.compare( password, user.password );
    if ( !valid ) {
      return res.status( 401 ).json( { error: 'Invalid credentials' } );
    }

    const token = signToken( {
      userId: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    } );

    logger.info( `User ${ user.email } logged in` );
    res.json( { token } );
  } catch ( error ) {
    next( error );
  }
} );

router.post( VERIFY_TOKEN, ( req: Request, res: Response, next ) => {
  try {
    const { token } = req.body;
    const user = verifyToken( token );
    res.json( { user } );
  } catch ( error ) {
    error.message = 'Invalid token';
    error.statusCode = 401;
    next( error );
  }
} );

export { router };

