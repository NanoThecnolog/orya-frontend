import { apiTray } from '@/services/classes/IntegraApi';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { zipcode, products } = req.body
    try {
        const cotation = await apiTray.getShippingCotation({ zipcode, products })
        return res.status(200).json(cotation)
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message });
    }
}