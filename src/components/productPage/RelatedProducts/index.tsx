import { Product } from '@/@types/tray/products'
import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import SendCartButton from '@/components/ui/CartButton'
import { Cart } from '@/services/classes/cartManager'
import { useMain } from '@/contexts/mainContext'
import { format } from '@/utils/formatContent'
import { useEffect, useState } from 'react'
import { relatedBreakpoints } from '@/common/variables/swiperBreakpoint'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'
import { productsImages } from '@/common/variables/products'
import { debug } from '@/utils/DebugLogger'

interface RelatedProps {
    related: Product[]
}

export default function RelatedProducts({ related }: RelatedProps) {
    const router = useRouter()
    const functions = new Functions(router)
    const { cartItems, setCartItems } = useMain()
    //const [width, setWidth] = useState(0)
    const [cardsPerContainer, setCardsPerContainer] = useState(4)

    const fallback = "/img/sem-foto.png"

    const handleClick = (product: Product) => {
        const cart = new Cart(cartItems, setCartItems)
        cart.addToCart(product)
    }

    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            //setWidth(windowWidth)
            debug.log(windowWidth)
            const { cards } = relatedBreakpoints.find(b => windowWidth < b.width) || { cards: 5 }
            setCardsPerContainer(cards)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <section className={styles.container}>
            <div className={styles.titleSection}>
                <h2>Produtos relacionados</h2>
            </div>
            <div className={styles.carouselContainer}>
                <Swiper
                    modules={[Navigation]}
                    navigation={false}
                    autoplay={false}
                    loop={false}
                    slidesPerView={Math.min(cardsPerContainer, related.length)}
                    className={styles.swiperCarousel}
                >
                    {related.length > 0 && related.map(product => {
                        const price = format.price(product.price ?? null)
                        const discount = format.discount(product.price ?? null, 10)
                        const imgData = productsImages.find(i => i.trayID === product.id);
                        const code = imgData?.codeImg?.[0];
                        const image = code !== undefined
                            ? functions.imagePath(code)
                            : fallback;
                        return (
                            <SwiperSlide key={product.id} className={styles.slide}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={image}
                                        alt={product.name}
                                        fill
                                        className={styles.image}
                                        priority={false}
                                        onClick={() => functions.pushProductPage(product.id)}
                                    />
                                    <div className={styles.buttonContainer}>
                                        <SendCartButton handleClick={() => handleClick(product)} />
                                    </div>
                                </div>
                                <div className={styles.productInfo} onClick={() => functions.pushProductPage(product.id)}>
                                    <h4>{product.name.toUpperCase()}</h4>
                                    <p>{price}</p>
                                    <p>{discount}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

        </section>
    )
}