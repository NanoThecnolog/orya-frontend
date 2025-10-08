import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { ProductProps } from '@/common/variables/products'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { format } from '@/utils/formatContent'

interface CarouselProductProps {
    products: ProductProps[]
    navigation?: boolean
    pagination?: boolean
    autoplay?: boolean
    loop?: boolean
}

export default function CarouselProducts2({
    products,
    navigation = true,
    pagination = false,
    autoplay = false,
    loop = true,
}: CarouselProductProps) {
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
                        slidesPerView={4}
                        className={styles.carousel}
                    >
                        {products.map((product, index) => {
                            const price = format.price(product.price)
                            const discount = format.discount(product.price, 10)
                            return (
                                <SwiperSlide key={index} className={styles.slide}>
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={product.img}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className={styles.image}
                                            priority={false}
                                        />
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h4>{product.name.toUpperCase()}</h4>
                                        <p>{price}</p>
                                        <p>{discount} no pix</p>
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