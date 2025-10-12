import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import { format } from '@/utils/formatContent'
import ProductImages from '../ProductImages'
import { useState } from 'react'

interface InfoProps {
    info: Product
}

export default function ProductInfo({ info }: InfoProps) {
    const [amount, setAmount] = useState<number>(1)
    console.log(info.variants[0].inventory_levels)

    const changeAmount = (operation: boolean) => {
        if (operation) {

            setAmount(amount + 1)
        }
        else {
            if (amount <= 1) return
            setAmount(amount - 1)
        }
    }
    return (
        <section className={styles.container}>
            <ProductImages images={info.images} />
            <div className={styles.infoContainer}>
                <div className={styles.productInfo}>
                    <h2>{info.name.pt}</h2>
                    <p>{format.price(info.variants[0].price)}</p>
                    <p>{format.discount(info.variants[0].price, 10)}</p>
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
                        <button type='button' className={styles.buyBtn}>Encomendar</button>
                    </div>
                </div>
                <div className={styles.paymentMethodsContainer}>
                    Meios de pagamento
                </div>
                <div className={styles.shippingContainer}>
                    Meios de envio
                </div>
                <div className={styles.descriptionContainer}>
                    <p>{info.description.pt}</p>
                </div>
            </div>
        </section>
    )
}