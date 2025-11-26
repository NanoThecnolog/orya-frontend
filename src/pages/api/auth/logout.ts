import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        destroyCookie({ res }, 'auth_token', {
            path: '/',
        });

        return res.status(200).json({ message: 'Logout realizado com sucesso.' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao realizar logout.' });
    }
}
