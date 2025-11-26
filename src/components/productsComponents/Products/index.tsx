import { Product } from '@/@types/tray/products'
import styles from './styles.module.scss'
import Image from 'next/image'
import { format } from '@/utils/formatContent'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'
import SendCartButton from '@/components/ui/CartButton'
import { Cart } from '@/services/classes/cartManager'
import { useMain } from '@/contexts/mainContext'
import { productsImages } from '@/common/variables/products'

interface CompProps {
    products: Product[]
}

export default function Products({ products }: CompProps) {
    const router = useRouter()
    const functions = new Functions(router)
    const { cartItems, setCartItems } = useMain()

    const handleClick = (product: Product) => {
        const cart = new Cart(cartItems, setCartItems)
        cart.addToCart(product)
    }
    return (
        <section className={styles.container}>
            {products.map(product => {
                const price = product.price
                const imgData = productsImages.find(i => i.trayID === product.id);
                const code = imgData?.codeImg?.[0];
                const image = code !== undefined
                    ? functions.imagePath(code)
                    : "/img/sem-foto.png";
                return (
                    <div key={product.id} className={styles.productContainer}>
                        <div className={styles.imageContainer} onClick={() => functions.pushProductPage(product.id)}>
                            <Image
                                src={image}
                                alt={product.name}
                                fill
                                priority={false}
                                className={styles.image}
                            />
                            <div className={styles.buttonContainer}>
                                <SendCartButton handleClick={() => handleClick(product)} />
                            </div>
                        </div>

                        <div className={styles.infoContainer}>
                            <h4>{product.name}</h4>
                            <p>{format.price(price)}</p>
                            <p>{format.discount(price)} <span>ou <strong>{product.payment_option_details[0].plots}x</strong> de <strong>{format.price(product.payment_option_details[0].value)}</strong></span></p>

                        </div>
                    </div>
                )
            }
            )}
        </section>
    )
}