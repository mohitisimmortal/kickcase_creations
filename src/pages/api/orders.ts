// api/orders.ts

import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, dimension, shoeSize, totalCost, drawers, addressInfo } = req.body;

        try {
            const order = await prisma.order.create({
                data: {
                    user: { connect: { id: userId } },
                    dimension,
                    shoeSize,
                    totalCost,
                    drawers: {
                        createMany: {
                            data: drawers.map((drawer: any) => ({
                                number: drawer.number,
                                color: drawer.color,
                                brandLogo: drawer.brandLogo,
                            })),
                        },
                    },
                    address: {
                        create: {
                            ...addressInfo,
                        },
                    },
                },
                include: {
                    drawers: true,
                    address: true,
                },
            });

            res.status(201).json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Error creating order' });
        }
    } else if (req.method === 'GET') {
        try {
            const orders = await prisma.order.findMany({
                include: { drawers: true, address: true },
            });

            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Error fetching orders' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
