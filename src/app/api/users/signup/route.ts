import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { HttpStatusCode } from 'axios';

import { connect } from '@/config/dbConfig';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // check if user is already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: HttpStatusCode.Conflict }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully', data: savedUser },
      { status: HttpStatusCode.Created }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
