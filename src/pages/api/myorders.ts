// api/myorders.ts

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId } = req.query;
        try {
            const orders = await prisma.order.findMany({
                where: { userId: Number(userId) },
                include: { drawers: true, address: { select: { address: true, city: true, state: true }} },
            });

            // Renaming 'address' field to 'addressInfo'
            const ordersWithRenamedAddress = orders.map(order => ({
                ...order,
                addressInfo: order.address,
                address: undefined, // Remove the 'address' field
            }));

            res.status(200).json(ordersWithRenamedAddress);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Error fetching orders' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
