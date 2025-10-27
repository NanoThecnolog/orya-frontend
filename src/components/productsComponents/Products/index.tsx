import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import Image from 'next/image'
import { format } from '@/utils/formatContent'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'
import SendCartButton from '@/components/ui/CartButton'
import { Ecommerce } from '@/services/classes/ecommerce'
import { useMain } from '@/contexts/mainContext'

interface CompProps {
    products: Product[]
}

export default function Products({ products }: CompProps) {
    const router = useRouter()
    const functions = new Functions(router)
    const { cartItems, setCartItems } = useMain()

    const handleClick = (product: Product) => {
        const ecommerce = new Ecommerce(cartItems, setCartItems)
        ecommerce.addToCart(product)
    }
    return (
        <section className={styles.container}>
            {products.map(product => {
                const price = product?.variants?.[0]?.price
                const image = product?.images?.[0]?.src ?? "/img/sem-foto.png"
                return (
                    <div key={product.id} className={styles.productContainer}>
                        <div className={styles.imageContainer} onClick={() => functions.pushProductPage(product.id)}>
                            <Image
                                src={image}
                                alt={product.name.pt}
                                fill
                                priority={false}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <SendCartButton handleClick={() => handleClick(product)} />
                        </div>
                        <div className={styles.infoContainer}>
                            <h4>{product.name.pt}</h4>
                            <p>{format.price(price)}</p>
                            <p>{format.discount(price, 10)}</p>
                        </div>
                    </div>
                )
            }
            )}
        </section>
    )
}