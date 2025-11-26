import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosError } from "axios";
import { apiTray } from '@/services/classes/IntegraApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ["GET"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    try {
        const response = await apiTray.getProducts()
        return res.status(200).json(response);
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message });
    }
}