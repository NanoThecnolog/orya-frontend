import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import { format } from '@/utils/formatContent'
import ProductImages from '../ProductImages'
import { useState } from 'react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { useMain } from '@/contexts/mainContext'
import { Cart } from '@/services/classes/cartManager'

interface InfoProps {
    product: Product
}

export default function ProductInfo({ product }: InfoProps) {
    const [amount, setAmount] = useState<number>(1)
    const { cartItems, setCartItems } = useMain()
    //console.log(product.variants[0].inventory_levels)

    const changeAmount = (operation: boolean) => {
        if (operation) {
            setAmount(amount + 1)
        }
        else {
            if (amount <= 1) return
            setAmount(amount - 1)
        }
    }
    const sendToCart = (product: Product) => {
        const cart = new Cart(cartItems, setCartItems)
        cart.addToCart(product, amount)
    }
    return (
        <section className={styles.container}>
            <div className={styles.productContainer}>
                <ProductImages images={product.images} />
                <div className={styles.infoContainer}>
                    <Breadcrumbs />
                    <div className={styles.productInfo}>
                        <h2>{product.name.pt}</h2>
                        <p>{format.price(product.variants[0].price)}</p>
                        <p>{format.discount(product.variants[0].price, 10)}</p>
                    </div>
                    <div className={styles.quantityContainer}>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                className={styles.input}
                            />
                            <button
                                type='button'
                                className={styles.decres}
                                onClick={() => changeAmount(false)}
                            >
                                -
                            </button>
                            <button
                                type='button'
                                className={styles.acres}
                                onClick={() => changeAmount(true)}
                            >
                                +
                            </button>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type='button' className={styles.buyBtn} onClick={() => sendToCart(product)}>Encomendar</button>
                        </div>
                    </div>
                    <div className={styles.paymentMethodsContainer}>
                        Meios de pagamento
                    </div>
                    <div className={styles.shippingContainer}>
                        Meios de envio
                    </div>
                    <div
                        className={styles.descriptionContainer}
                        dangerouslySetInnerHTML={{ __html: product.description.pt }}
                    />
                </div>
            </div>
        </section>
    )
}