import { Product } from '@/@types/tray/products'
import styles from './styles.module.scss'
import { format } from '@/utils/formatContent'
import ProductImages from '../ProductImages'
import { useState } from 'react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { useMain } from '@/contexts/mainContext'
import { Cart } from '@/services/classes/cartManager'
import { ProductDetails } from '@/@types/tray/ProductDetails'

interface InfoProps {
    product: ProductDetails
}

export default function ProductInfo({ product }: InfoProps) {
    const [amount, setAmount] = useState<number>(1)
    const { cartItems, setCartItems, paymentOptions } = useMain()

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
                <ProductImages product={product} />
                <div className={styles.infoContainer}>
                    <Breadcrumbs />
                    <div className={styles.productInfo}>
                        <h2>{product.Product.name}</h2>
                        <p>{format.price(product.Product.price)}</p>
                        <p>{format.discount(product.Product.price, 10)} <span>ou <strong>{product.Product.payment_option_details[0].plots}x</strong> de <strong>{format.price(product.Product.payment_option_details[0].value)}</strong></span></p>


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
                            <button type='button' className={styles.buyBtn} onClick={() => sendToCart(product.Product)}>Encomendar</button>
                        </div>
                    </div>
                    <div
                        className={styles.descriptionContainer}
                        dangerouslySetInnerHTML={{ __html: product.Product.description }}
                    />
                    <div>
                        *Joia disponível sob encomenda. Nossa confecção é manual e o prazo de produção é de 30 dias úteis.
                    </div>
                </div>
            </div>
        </section>
    )
}