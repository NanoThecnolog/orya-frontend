import { apiTray } from '@/services/classes/IntegraApi';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        res.setHeader('Allow', ['PATCH'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { id } = req.query
    const data = req.body
    if (data.birth_date) {
        data.birth_date = new Date(data.birth_date).toISOString().split("T")[0]
    }
    try {
        const response = await apiTray.updateCustomer(id as string, data)
        return res.status(200).json(response)
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message })
    }

}