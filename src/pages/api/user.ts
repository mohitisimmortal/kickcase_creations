// pages/api/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey: string = process.env.JWT_SECRET_KEY || 'default-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Check if the request contains an authentication token
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Decode the token to extract user information
    const decodedToken = decodeToken(token);
    const userEmail = decodedToken.email;

    // Retrieve user data from the database using the email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        userId: user.id, // Renaming 'id' to 'userId' for clarity
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

function decodeToken(token: string): any {
  const decodedToken = verify(token, secretKey);
  return decodedToken; // Assuming the token contains the user's email
}

