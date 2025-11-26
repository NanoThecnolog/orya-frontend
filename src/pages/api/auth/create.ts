/*Nessa rota, vou receber email, cpf, senha do usuario.
Vou usar os metodos da classe integraAPI pra:

- consultar se existe um cliente na tray com o cpf e emails informados
- verificar se os dois batem com o cadastro
- se baterem, vou criar usuario no banco de dados
- se não, vou retornar erro informando que há inconsistências com as informações
*/
import { apiTray } from '@/services/classes/IntegraApi';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface DataProps {
    name: string,
    trayID: string,
    email: string,
    password: string,
    status: "ACTIVE" | "INACTIVE"
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { email, cpf, password } = req.body

    if (!email || !cpf || !password) {
        return res.status(400).json({ message: "Email, CPF e senha são obrigatórios." });
    }
    try {

        const getTrayCustomers = await apiTray.getCustomers(email, cpf)
        const customers = getTrayCustomers?.Customers
        if (!Array.isArray(customers) || customers.length === 0)
            return res.status(400).json({ message: "Nenhum cliente encontrado. Verifique os dados e tente novamente." })
        if (customers.length > 1) {
            return res.status(400).json({ message: "Email e CPF não são do mesmo comprador. Verifique os dados e tente novamente." });
        }
        const customer = customers[0]?.Customer


        const data: DataProps = {
            name: customer.name,
            trayID: customer.id,
            email: customer.email,
            password,
            status: "ACTIVE"
        }

        const newUser = await apiTray.createUser(data)
        return res.status(201).json(newUser)
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        const status = error.response?.status || 500
        const message = error.response?.data?.message || error.message
        return res.status(status).json({ message })
    }
}