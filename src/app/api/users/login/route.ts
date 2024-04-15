import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { HttpStatusCode } from 'axios';
import jsonwebtoken from 'jsonwebtoken';

import { connect } from '@/config/dbConfig';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: HttpStatusCode.BadRequest }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: HttpStatusCode.BadRequest }
      );
    }

    // create jwt token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({ message: 'Login successfully' });
    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
