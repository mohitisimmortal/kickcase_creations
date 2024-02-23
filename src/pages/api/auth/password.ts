// pages/api/auth/password.ts

import { NextApiRequest, NextApiResponse } from 'next';

const correctPassword = process.env.ADMIN_PASSWORD || 'default-password';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { password } = req.body;
        if (password === correctPassword) {
            res.status(200).json({ message: 'Password is correct' });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
