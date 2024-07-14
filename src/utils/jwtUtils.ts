import { prisma } from '../database/prisma';

import jwt, { JwtPayload as JWT } from 'jsonwebtoken';

interface JwtPayload extends JWT {
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
  role: 'OWNER' | 'WALKER' | 'ADMIN';
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

const signToken = ( payload: JwtPayload ) => {
  return jwt.sign( payload, JWT_SECRET, { expiresIn: '1d' } );
};


const generateToken = ( user: JwtPayload ) => {
  return jwt.sign(
    {
      userId: user.userId,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const verifyToken = ( token: string ) => {
  return jwt.verify( token, JWT_SECRET ) as JwtPayload;
};

const getUserFromToken = async( token: string ) => {
  // remove bearer from token
  token = token.split( ' ' )[1];
  try {
    const payload: JwtPayload = verifyToken( token );
    return await prisma.user.findUnique( { where: { id: payload.userId } } );
  } catch ( err ) {
    return null;
  }
};

export { generateToken, verifyToken, signToken, getUserFromToken };