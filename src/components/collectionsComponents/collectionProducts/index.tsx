import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import styles from './styles.module.scss'
import { Product } from '@/@types/tray/products'
import { format } from '@/utils/formatContent'
import Image from 'next/image'
import { useMain } from '@/contexts/mainContext'
import { Cart } from '@/services/classes/cartManager'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'
import { productsImages } from '@/common/variables/products'

interface CompProps {
    products: Product[]
}

export default function CollectionProducts({ products }: CompProps) {
    const router = useRouter()
    const functions = new Functions(router)
    const { cartItems, setCartItems } = useMain()

    const fallback = "/img/sem-foto.png"

    const handleClick = (product: Product): void => {
        const cart = new Cart(cartItems, setCartItems)
        cart.addToCart(product)

    }
    return (
        <section className={styles.container}>
            <Breadcrumbs />
            <div className={styles.productsContainer}>
                {products.map((product) => {
                    const price = format.price(product.price ?? null)
                    const discount = format.discount(product.price ?? null)
                    const imgData = productsImages.find(i => i.trayID === product.id);
                    const code = imgData?.codeImg?.[0];
                    const image = code !== undefined
                        ? functions.imagePath(code)
                        : fallback;
                    return (
                        <div key={product.id} className={styles.productContainer}>
                            <div className={styles.imageContainer} onClick={() => functions.pushProductPage(product.shortcut)}>
                                <Image
                                    src={image}
                                    alt={product.name || "Imagem do produto"}
                                    fill
                                    priority={false}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.infoContainer}>
                                <h3>{(product.name).toUpperCase()}</h3>
                                <div className={styles.priceContainer}>
                                    <h4>{price}</h4>
                                    <h5>{discount} <span>ou <strong>{product.payment_option_details[0].plots}x</strong> de <strong>{format.price(product.payment_option_details[0].value)}</strong></span></h5>
                                </div>
                            </div>
                            <div className={styles.buttonContainer} onClick={() => handleClick(product)}>
                                <button type='button'>Adicionar ao carrinho!</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}