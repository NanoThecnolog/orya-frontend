import { apiTray } from '@/services/classes/IntegraApi';
import { debug } from '@/utils/DebugLogger';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { email, password } = req.body
    //debug.log(`email: ${email} e password: ${password}`)

    try {
        const response = await apiTray.login(email, password)
        const token = response?.token
        const user = response?.user

        if (!token || !user) throw new Error("Token ou dados do usuário não recebidos.")

        setCookie({ res }, 'auth_token', token, {
            maxAge: 60 * 60 * 24 * 10,
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        console.log("token dentro da rota api/auth/login", token)

        return res.status(200).json({ user })
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message });
    }
}