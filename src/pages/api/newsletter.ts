import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const url = `https//${process.env.API_ADDRESS}/newsletter/`
const accessToken = process.env.ACCESSTOKEN

interface NewsletterRes {
    id: number,
    code: number,
    message: string,

}

//rota pra cadastrar email na newsletter
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { email, name } = req.body
    try {

        const response = {
            email, name, url, accessToken
        }

        return res.status(200).json(response)
        /*const response = await axios.post<NewsletterRes>(url, {
            headers: {
                accessToken
            },
            data: {
                Newsletter: {
                    email, name
                }
            }
        })
        const data = response.data
        if (data.message !== "Created") {
            return res.status(200).json({ message: "Email registrated" })
        }*/
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message })
    }

}