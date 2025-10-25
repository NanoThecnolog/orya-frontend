import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import SendCartButton from '@/components/ui/CartButton'
import { Ecommerce } from '@/services/classes/ecommerce'
import { useMain } from '@/contexts/mainContext'
import { format } from '@/utils/formatContent'
import { useEffect, useState } from 'react'
import { relatedBreakpoints } from '@/common/variables/swiperBreakpoint'
import { useRouter } from 'next/navigation'

interface RelatedProps {
    related: Product[]
}

export default function RelatedProducts({ related }: RelatedProps) {
    const router = useRouter()
    const { cartItems, setCartItems } = useMain()
    const [width, setWidth] = useState(0)
    const [cardsPerContainer, setCardsPerContainer] = useState(4)

    const handleClick = (product: Product) => {
        const ecommerce = new Ecommerce(cartItems, setCartItems)
        ecommerce.addToCart(product)
    }
    const pushProductPage = (id: number) => {
        router.push(`/product/${id}`)
    }
    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            setWidth(windowWidth)
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
                    slidesPerView={cardsPerContainer}
                    className={styles.swiperCarousel}
                >
                    {related.length > 0 && related.map(product => {
                        const price = format.price(product.variants?.[0]?.price ?? null)
                        const discount = format.discount(product.variants?.[0]?.price ?? null, 10)
                        const image = product.images?.[0]?.src ?? "/img/sem-foto.png"
                        return (
                            <SwiperSlide key={product.id} className={styles.slide}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={image}
                                        alt={product.name.pt}
                                        fill
                                        className={styles.image}
                                        priority={false}
                                        onClick={() => pushProductPage(product.id)}
                                    />
                                    <div className={styles.buttonContainer}>
                                        <SendCartButton handleClick={() => handleClick(product)} />
                                    </div>
                                </div>
                                <div className={styles.productInfo} onClick={() => pushProductPage(product.id)}>
                                    <h4>{product.name.pt.toUpperCase()}</h4>
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