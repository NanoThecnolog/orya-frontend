import Head from 'next/head'
import styles from './styles.module.scss'
import Aside from '@/components/MeComponents/Aside'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { apiTray } from '@/services/classes/IntegraApi'
import { parseCookies } from 'nookies'
import { verify } from 'jsonwebtoken'
import { useMain } from '@/contexts/mainContext'
import { UserLoginProps } from '@/@types/tray/loginProps'
import Orders from '@/components/MeComponents/Orders'
import { OrderProps, OrderWrap } from '@/@types/tray/Orders'
import { CustomerListItem } from '@/@types/tray/getCustomersResponse'
import CustomerData from '@/components/MeComponents/CustomerData'
import { CustomerAddressResponse } from '@/@types/tray/customerAddress'
import OrderComp from '@/components/MeComponents/Order'

interface MeProps {
    userData: UserLoginProps | null
    orders: OrderWrap[]
    trayData: CustomerListItem | null
    address: CustomerAddressResponse | null
}
export default function Me({ userData, orders, trayData, address }: MeProps) {
    const [id, setId] = useState('a')
    const { user, setUser } = useMain()
    const [orderID, setOrderID] = useState<string>('')

    useEffect(() => {
        if (!userData) return
        if (!user) setUser(userData)
    }, [userData])

    const component = () => {
        if (id === 'a') {
            return <Orders orders={orders} setComponent={setId} setOrder={setOrderID} />
        }
        if (id === 'b') {
            return <CustomerData data={trayData} address={address} />
        }
        if (id === 'c') {
            return <OrderComp orderID={orderID} />
        }
    }
    return (
        <>
            <Head>
                <title>Área do Cliente</title>
                <meta name='description' content='Area do cliente' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <h1>
                    Olá, {user?.name}
                </h1>
                <section className={styles.componentContainer}>
                    <Aside current={id} setComponent={setId} />
                    <div className={styles.componentArea}>
                        {component()}
                    </div>
                </section>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const secret = process.env.SECRET_JWT
    const { auth_token: token } = parseCookies(ctx)

    try {
        if (!token || !secret)
            throw new Error('Token ou secret ausente')

        const decoded = verify(token, secret) as { sub: string }
        if (!decoded?.sub)
            throw new Error('Token inválido: campo sub ausente')

        const userId = decoded.sub
        const userData = await apiTray.getUserDetails(userId)
        if (!userData?.trayID)
            throw new Error('Usuário não possui trayId')

        const orders = await apiTray.getOrdersByCustomer(userData.trayID)

        const trayData = await apiTray.getCustomers(userData.email)

        const customer = trayData?.Customers?.[0]?.Customer
        if (!customer)
            throw new Error('Nenhum dado de cliente encontrado')

        const addressId = customer?.CustomerAddress?.[0]?.id
        if (!addressId)
            throw new Error('Endereço do cleinte não encontrado')
        const address = await apiTray.getAddressById(addressId)

        return {
            props: {
                userData: userData ?? null,
                orders,
                trayData: trayData?.Customers[0].Customer,
                address: address ?? null
            }
        }
    } catch (err) {
        console.error("Erro ao buscar dados do usuario", err)
        return {
            props: {
                userData: null,
                orders: [],
                trayData: null,
                address: null
            }
        }
    }
}