// pages/api/orders/[orderId]/delivered.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId } = req.query;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { delivered: true },
    });

    return res.json(updatedOrder);
  } catch (error) {
    console.error('Failed to update order:', error);
    return res.status(500).json({ error: 'Failed to update order' });
  }
}
