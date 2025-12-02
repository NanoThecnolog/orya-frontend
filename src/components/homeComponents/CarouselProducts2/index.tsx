import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { format } from '@/utils/formatContent'
import { Product, ProductList } from '@/@types/tray/products'
import { useRouter } from 'next/navigation'
import { useMain } from '@/contexts/mainContext'
import SendCartButton from '@/components/ui/CartButton'
import { Functions } from '@/utils/functions'
import { Cart } from '@/services/classes/cartManager'
import { productsImages } from '@/common/variables/products'

interface CarouselProductProps {
    products: ProductList | null
    navigation?: boolean
    pagination?: boolean
    autoplay?: boolean
    loop?: boolean,
    cardsPerContainer: number
}

export default function CarouselProducts2({
    products,
    navigation = true,
    pagination = false,
    autoplay = false,
    loop = true,
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
                <div className={styles.carouselContainer}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        loop={loop}
                        navigation={navigation}
                        pagination={pagination ? { clickable: true } : false}
                        autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
                        slidesPerView={cardsPerContainer}
                        initialSlide={4}
                        className={styles.carousel}
                    >
                        {Array.isArray(products) && products.map((product, index) => {
                            const price = format.price(product.price)
                            const discount = format.discount(product.price, 10)
                            const imgData = productsImages.find(i => i.trayID === product.id);
                            const code = imgData?.codeImg?.[0];
                            const image = code !== undefined
                                ? functions.imagePath(code)
                                : "/img/sem-foto.png";
                            const payment = product?.payment_option_details?.[0] || null

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
                                        <p>{discount} {payment && <span>ou <strong>{payment.plots}x</strong> de <strong>{format.price(payment.value)}</strong></span>}</p>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}