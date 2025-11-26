import { OrderProps, OrderWrap } from '@/@types/tray/Orders'
import styles from './styles.module.scss'
import { format } from '@/utils/formatContent'
import { JSX } from 'react';
import { FaCheck, FaMoneyBill, FaTimes, FaTruck } from 'react-icons/fa';

interface OrdersProps {
    orders: OrderWrap[]
    setComponent: (a: string) => void
    setOrder: (a: string) => void
}
export default function Orders({ orders, setComponent, setOrder }: OrdersProps) {


    const statusIcons: Record<string, JSX.Element> = {
        "aguardando pagamento": <FaMoneyBill size={25} />,
        "aguardando envio": <FaTruck size={25} />,
        "a enviar": <FaTruck size={25} />,
        "enviado": <FaTruck size={25} />,
        "cancelado": <FaTimes size={25} />,
        "finalizado": <FaCheck size={25} />
    };

    const openOrder = (orderID: string) => {
        setOrder(orderID)
        setComponent('c')
    }

    return (
        <section className={styles.container}>
            <h1>Meus Pedidos</h1>
            <div className={styles.tableWrapper}>
                <table className={styles.tabelaPedidos}>
                    <thead>
                        <tr>
                            <th>Data da compra</th>
                            <th>Valor da compra</th>
                            <th>Status do pedido</th>
                            <th>ID do pedido</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => {
                            const price = format.price(order.Order.total)
                            return <tr key={order.Order.id} className={styles.rowData} onClick={() => openOrder(order.Order.id)}>
                                <td>{format.date(order.Order.date)}</td>
                                <td>{price}</td>
                                <td>{statusIcons[order.Order.status.toLowerCase()]} {order.Order.status}</td>
                                <td>{order.Order.id}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </section>
    )
}