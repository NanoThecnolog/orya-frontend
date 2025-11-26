import { apiTray } from '@/services/classes/IntegraApi';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';


//rota pra cadastrar email na newsletter
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { email, name } = req.body
    try {

        //return res.status(200).json(response)
        const response = await apiTray.newsLetter({ NewsLetter: { email, name } })
        if (!response || response.message !== "Created") {
            return res.status(400).json({ message: "Email não registrado" })
        }
        return res.status(200).json({ message: "Email registrado" })
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message })
    }

}