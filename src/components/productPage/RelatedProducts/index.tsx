import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import SendCartButton from '@/components/ui/CartButton'
import { Ecommerce } from '@/services/classes/ecommerce'
import { useMain } from '@/contexts/mainContext'
import { format } from '@/utils/formatContent'

interface RelatedProps {
    related: Product[]
}

export default function RelatedProducts({ related }: RelatedProps) {
    const { cartItems, setCartItems } = useMain()

    const handleClick = (product: Product) => {
        const ecommerce = new Ecommerce(cartItems, setCartItems)
        ecommerce.addToCart(product)
    }
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
                    slidesPerView={6}
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
                                    />
                                    <div className={styles.buttonContainer}>
                                        <SendCartButton handleClick={() => handleClick(product)} />
                                    </div>
                                </div>
                                <div className={styles.productInfo}>
                                    <h4>{product.name.pt.toUpperCase()}</h4>
                                    <p>{price}</p>
                                    <p>{discount}</p>
                                </div>
                            </SwiperSlide>
                        )
                    }

                    )}
                </Swiper>
            </div>

        </section>
    )
}