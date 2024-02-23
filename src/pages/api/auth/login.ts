// pages/api/auth/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey: string = process.env.JWT_SECRET_KEY || 'default-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '30d' });

    // Set the token in a cookie
    const thirtyDaysInSeconds = 30 * 24 * 60 * 60; // 30 days in seconds

    const expires = new Date();
    expires.setTime(expires.getTime() + thirtyDaysInSeconds * 1000); // Convert to milliseconds
    console.log(user);

    res.setHeader('Set-Cookie', `accessToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=${expires.toUTCString()}; Max-Age=${thirtyDaysInSeconds}`);

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
