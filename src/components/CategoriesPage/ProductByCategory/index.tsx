import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import Image from 'next/image'
import { format } from '@/utils/formatContent'
import SendCartButton from '@/components/ui/CartButton'
import { Cart } from '@/services/classes/cartManager'
import { useMain } from '@/contexts/mainContext'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'

interface CompProps {
    products: Product[]
}

export default function ProductsByCategory({ products }: CompProps) {
    const { cartItems, setCartItems } = useMain()
    const router = useRouter()

    const functions = new Functions(router)


    const handleClick = (product: Product) => {
        const ecommerce = new Cart(cartItems, setCartItems)
        ecommerce.addToCart(product)
    }

    return (
        <section className={styles.container}>
            <div className={styles.productContainer}>
                {products.map(product => {
                    const price = format.price(product.variants?.[0]?.price ?? null)
                    const discount = format.discount(product.variants?.[0]?.price ?? null, 10)
                    const image = product.images?.[0]?.src ?? "/img/sem-foto.png"
                    return (
                        <div key={product.id} className={styles.productItem}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={image}
                                    alt={product.name.pt}
                                    fill
                                    priority={false}
                                    className={styles.image}
                                />
                                <div className={styles.buttonContainer}>
                                    <SendCartButton handleClick={() => handleClick(product)} />
                                </div>
                            </div>
                            <div className={styles.textContainer} onClick={() => functions.pushProductPage(product.id)}>
                                <h3>{product.name.pt.toUpperCase()}</h3>
                                <div className={styles.price}>
                                    <p>{price}</p>
                                    <p>{discount}</p>
                                </div>
                            </div>
                        </div>
                    )
                }

                )}
            </div>
        </section>
    )
}