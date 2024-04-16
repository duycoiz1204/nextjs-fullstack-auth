import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const claims: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return claims.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
