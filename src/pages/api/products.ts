import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from "axios";
const url = process.env.BASE_URL
const token = process.env.ACCESS_TOKEN
const userID = process.env.CLIENT_ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ["GET"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    try {
        const response = await axios.get(`${url}/products`, {
            headers: {
                Authentication: `bearer ${token}`,
                "User-Agent": "loja-teste (contato@ericssongomes.com)"
            },
        });
        return res.status(200).json(response.data);
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message });
    }
    //return res.status(200).json({ message: "ok" })
}