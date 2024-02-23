// pages/api/auth/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { hashPassword } from '@/utils/auth';

const prisma = new PrismaClient();
const secretKey: string = process.env.JWT_SECRET_KEY || 'default-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
            },
        });

        // Generate a JWT token
        const token = sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '30d' });

        // Set the token in a cookie
        const thirtyDaysInSeconds = 30 * 24 * 60 * 60; // 30 days in seconds

        const expires = new Date();
        expires.setTime(expires.getTime() + thirtyDaysInSeconds * 1000); // Convert to milliseconds

        res.setHeader('Set-Cookie', `accessToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Expires=${expires.toUTCString()}; Max-Age=${thirtyDaysInSeconds}`);

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        // handleApiError(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
