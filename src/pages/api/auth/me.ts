import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import jwt, { verify } from 'jsonwebtoken';
import { apiTray } from '@/services/classes/IntegraApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const cookies = parseCookies({ req });
        const token = cookies.auth_token;

        if (!token) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const decoded = verify(token, process.env.JWT_SECRET!) as { sub: string };

        const userId = decoded.sub;
        if (!userId) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const user = await apiTray.getUserDetails(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ user });

    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}
