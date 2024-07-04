import { prisma } from '../prisma/prisma.js';

import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';
import jwt, { JwtPayload as JWT } from 'jsonwebtoken';

interface JwtPayload extends JWT {
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
  role: 'OWNER' | 'WALKER' | 'ADMIN';
}

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
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

router.post( '/register', async( req: RegisterRequest, res: Response, next ) => {
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

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json( { token } );
  } catch ( error ) {
    next( error );
  }
} );

router.post( '/login', async( req: LoginRequest, res: Response, next ) => {
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

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json( { token } );
  } catch ( error ) {
    next( error );
  }
} );

router.post( '/verify-token', ( req: Request, res: Response, next ) => {
  try {
    const { token } = req.body;
    const user = jwt.verify( token, JWT_SECRET );
    res.json( { user } );
  } catch ( error ) {
    error.message = 'Invalid token';
    error.statusCode = 401;
    next( error );
  }
} );

const getUserFromToken = async( token: string ) => {
  // remove bearer from token
  token = token.split( ' ' )[1];
  try {
    const payload: JwtPayload = jwt.verify( token, JWT_SECRET ) as JwtPayload;
    return await prisma.user.findUnique( { where: { id: payload.userId } } );
  } catch ( err ) {
    return null;
  }
};

export { router, getUserFromToken };
