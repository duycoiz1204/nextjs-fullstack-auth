import { NextRequest, NextResponse } from 'next/server';

import { connect } from '@/config/dbConfig';
import User from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { HttpStatusCode } from 'axios';

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');
    return NextResponse.json({ message: 'User found', data: user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
