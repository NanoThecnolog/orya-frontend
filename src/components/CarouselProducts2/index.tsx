import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { ProductProps } from '@/common/variables/products'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { format } from '@/utils/formatContent'
import { ProductList } from '@/@types/nuvemshop/products'

interface CarouselProductProps {
    products: ProductList | null
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
                        initialSlide={3}
                        className={styles.carousel}
                    >
                        {products && products.map((product, index) => {
                            const price = format.price(product.variants?.[0]?.price).replace(".", ",")
                            const discount = format.discount(product.variants?.[0]?.price, 10).replace(".", ",")
                            return (
                                <SwiperSlide key={index} className={styles.slide}>
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={product.images[0].src}
                                            alt={product.name.pt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className={styles.image}
                                            priority={false}
                                        />
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h4>{product.name.pt.toUpperCase()}</h4>
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