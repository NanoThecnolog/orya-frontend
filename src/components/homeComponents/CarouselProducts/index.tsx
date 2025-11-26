import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { format } from '@/utils/formatContent'
import { useRouter } from 'next/navigation'
import { useMain } from '@/contexts/mainContext'
import SendCartButton from '@/components/ui/CartButton'
import { Cart } from '@/services/classes/cartManager'
import { Functions } from '@/utils/functions'
import { Product } from '@/@types/tray/products'
import { productsImages } from '@/common/variables/products'

interface CarouselProductProps {
    products: Product[] | null
    navigation?: boolean
    pagination?: boolean
    autoplay?: boolean
    loop?: boolean
    text?: boolean
    cardsPerContainer: number
}

export default function CarouselProducts({
    products,
    navigation = true,
    pagination = false,
    autoplay = false,
    loop = true,
    text = false,
    cardsPerContainer
}: CarouselProductProps) {
    const router = useRouter()
    const { cartItems, setCartItems } = useMain()
    const functions = new Functions(router)

    const handleClick = (product: Product) => {
        const cart = new Cart(cartItems, setCartItems)
        cart.addToCart(product)
    }

    return (
        <section className={styles.container}>
            <div className={styles.products}>
                {text && <div className={styles.textContainer}>
                    <h2>Cada peça é uma história que se entrelaça com a sua.</h2>
                    <p>Criada para refletir sua autenticidade e te acompanhar nos momentos que importam.</p>
                </div>}
                <div className={styles.carouselContainer}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        loop={loop}
                        navigation={navigation}
                        pagination={pagination ? { clickable: true } : false}
                        autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
                        slidesPerView={cardsPerContainer}
                        className={styles.carousel}
                    >
                        {
                            Array.isArray(products) &&
                            products.map((product, index) => {
                                const price = format.price(product.price ?? null)
                                const discount = format.discount(product.price ?? null, 10)
                                const imgData = productsImages.find(i => i.trayID === product.id);
                                const code = imgData?.codeImg?.[0];
                                const image = code !== undefined
                                    ? functions.imagePath(code)
                                    : "/img/sem-foto.png";


                                return (
                                    <SwiperSlide key={index} className={styles.slide}>
                                        <div className={styles.imageContainer}>
                                            <Image
                                                src={image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className={styles.image}
                                                priority={false}
                                                onClick={() => functions.pushProductPage(product.id)}
                                            />
                                            <div className={styles.buttonContainer}>
                                                <SendCartButton handleClick={() => handleClick(product)} />
                                            </div>
                                        </div>
                                        <div className={styles.productInfo}>
                                            <h4>{product.name.toUpperCase()}</h4>
                                            <p>{price}</p>
                                            <p>{discount} <span>ou <strong>{product.payment_option_details[0].plots}x</strong> de <strong>{format.price(product.payment_option_details[0].value)}</strong></span></p>
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                            )}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}