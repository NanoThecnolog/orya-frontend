import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'
import { OrderProps, OrderWrap } from '@/@types/tray/Orders'
import { Product } from '@/@types/tray/products'
import { OrderComplete, OrderResponseComplete, ProductSoldWrapper } from '@/@types/tray/OrderComplete'
import { format } from '@/utils/formatContent'
import { productsImages } from '@/common/variables/products'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'

interface OrderProduct {
    id: number
    name: string
    image: string
    quantity: number
    price: number
}

interface OrderPayment {
    method: string
}

interface OrderAddress {
    street: string
    number: string
    district: string
    city: string
    state: string
    zip: string
}

interface Order {
    id: number
    date: string
    total: number
    status: string
    products: OrderProduct[]
    payment: OrderPayment
    address: OrderAddress
}

interface OrderCompProps {
    orderID: string | null
}

export default function OrderComp({ orderID }: OrderCompProps) {
    const router = useRouter()
    const functions = new Functions(router)

    const [order, setOrder] = useState<OrderComplete | null>(null)
    const [orderProducts, setOrderProducts] = useState<ProductSoldWrapper[]>([])


    const getOrderDetails = async () => {
        try {
            const response = await axios.get<OrderResponseComplete>(`/api/order/complete/${orderID}`)
            const orderData = response.data.Order

            setOrder(orderData)
            const products = orderData.ProductsSold
            setOrderProducts(products)

        } catch (err) {
            console.error(`Erro ao buscar dados do pedido id: ${orderID}`, err)
        }
    }
    useEffect(() => {
        if (orderID) getOrderDetails()
    }, [orderID])

    if (!orderID) return <div>Carregando dados do pedido...</div>
    return (
        <section className={styles.container}>

            {
                order &&
                <>
                    <header className={styles.header}>
                        <div className={styles.info}>
                            <h2>Pedido #{order.id}</h2>
                            <p>Data da compra: {format.date(order.date)}</p>
                            <p>Status: {order.status}</p>
                            <p>Frete: {format.price(order.shipment_value)} <span>{order.shipment/*order.estimated_delivery_date && `- Data Estimada de Entrega: ${format.date(order.estimated_delivery_date)}`*/}</span></p>
                            <p>Total: {format.price(order.total)}</p>
                        </div>
                        <div className={styles.shipping}>
                        </div>
                    </header>

                    <div className={styles.section}>
                        <h3>Produtos</h3>
                        <ul className={styles.productList}>
                            {orderProducts.map(item => {
                                const product = item.ProductsSold
                                const imgData = productsImages.find(i => i.trayID === product.id);
                                const code = imgData?.codeImg?.[0];
                                const image = code !== undefined
                                    ? functions.imagePath(code)
                                    : "/img/sem-foto.png";
                                return (

                                    <li key={product.id} className={styles.productItem}>
                                        <img src={image} alt={product.name} />
                                        <div>
                                            <p>{product.name}</p>
                                            <p>Quantidade: {product.quantity}</p>
                                            <p>Preço:{format.price(product.price)}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h3>Forma de pagamento</h3>
                        <p>{order.payment_method}</p>
                    </div>

                    <div className={styles.section}>
                        <h3>Endereço de entrega</h3>
                        <p>
                            {order.Customer.address}, {order.Customer.number} – {order.Customer.neighborhood}
                        </p>
                        <p>
                            {order.Customer.city} / {order.Customer.state}
                        </p>
                        <p>CEP: {order.Customer.zip_code}</p>
                    </div>
                </>
            }
        </section>
    )
}
