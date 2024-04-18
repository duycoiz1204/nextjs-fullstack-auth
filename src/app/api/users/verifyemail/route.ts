import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { connect } from '@/config/dbConfig';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
    });
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: HttpStatusCode.BadRequest }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
