import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.BASE_URL
    const token = process.env.ACCESS_TOKEN
    const userID = process.env.CLIENT_ID
    console.log(url, token, userID)
    try {
        const response = await axios.get(`${url}/store`, {
            headers: {
                Authentication: `bearer ${token}`,
                "User-Agent": "loja-teste (contato@ericssongomes.com)"
            },
        });

        res.status(200).json(response.data);
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        res.status(status || 500).json({ message });
    }
}
