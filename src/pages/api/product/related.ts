import { Product } from '@/@types/tray/products';
import { apiTray } from '@/services/classes/IntegraApi';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { product, productList } = req.body
    if (!product) return res.status(400).end('Produto não enviado')
    if (!productList || productList.length === 0) return res.status(400).end("Lista de produtos não enviada ou inválida")

    try {
        const response: Product[] = await apiTray.relatedProducts(product, productList)
        return res.status(200).json(response)
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status || 500).json({ message });
    }
}