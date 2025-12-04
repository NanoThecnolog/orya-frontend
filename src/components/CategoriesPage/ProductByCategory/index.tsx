import { Product } from '@/@types/tray/products'
import styles from './styles.module.scss'
import Image from 'next/image'
import { format } from '@/utils/formatContent'
import SendCartButton from '@/components/ui/CartButton'
import { Cart } from '@/services/classes/cartManager'
import { useMain } from '@/contexts/mainContext'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'
import { productsImages } from '@/common/variables/products'

interface CompProps {
    products: Product[]
}

export default function ProductsByCategory({ products }: CompProps) {
    const router = useRouter()
    const fallback = "/img/sem-foto.png"
    const functions = new Functions(router)

    const { cartItems, setCartItems } = useMain()

    const handleClick = (product: Product) => {
        const cart = new Cart(cartItems, setCartItems)
        cart.addToCart(product)
    }

    return (
        <section className={styles.container}>
            <div className={styles.productContainer}>
                {products.map(product => {
                    const price = format.price(product.price ?? null)
                    const discount = format.discount(product.price ?? null)
                    const imgData = productsImages.find(i => i.trayID === product.id);
                    const code = imgData?.codeImg?.[0];
                    const image = code !== undefined
                        ? functions.imagePath(code)
                        : fallback;
                    return (
                        <div key={product.id} className={styles.productItem}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={image}
                                    alt={product.name}
                                    fill
                                    priority={false}
                                    className={styles.image}
                                    onClick={() => functions.pushProductPage(product.shortcut)}
                                />
                                <div className={styles.buttonContainer}>
                                    <SendCartButton handleClick={() => handleClick(product)} />
                                </div>
                            </div>
                            <div className={styles.textContainer} onClick={() => functions.pushProductPage(product.shortcut)}>
                                <h3>{product.name.toUpperCase()}</h3>
                                <div className={styles.price}>
                                    <p>{price}</p>
                                    <p>{discount} <span>ou <strong>{product.payment_option_details[0].plots}x</strong> de <strong>{format.price(product.payment_option_details[0].value)}</strong></span></p>
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