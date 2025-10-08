import Image from 'next/image';
import styles from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export type CarouselImage = {
    src: string,
    alt?: string
}

interface CarouselProps {
    images: CarouselImage[]
    loop?: boolean
    autoplay?: boolean
    pagination?: boolean
    navigation?: boolean
    className?: string
}

export default function Carousel({
    images,
    loop = true,
    autoplay = true,
    pagination = true,
    navigation = false,
    className = ""
}: CarouselProps) {

    if (!images || images.length === 0) return null

    const logo = "/logo/SEM FUNDO/ORYÁ_LOGO SF_V2_2.png"

    return (
        <section className={`${styles.carouselContainer} ${className}`}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={loop}
                navigation={navigation}
                pagination={pagination ? { clickable: true } : false}
                autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
                slidesPerView={1}
                className={styles.carousel}
            >
                {images.map((img, index) =>
                    <SwiperSlide key={index} className={styles.slide}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={img.src}
                                alt={img.alt ?? `slide-${index}`}
                                fill
                                sizes='(max-width: 768px) 100vw, 50vw'
                                className={styles.image}
                                priority={index === 0}
                            />
                            <Image
                                src={logo}
                                alt="Logo"
                                width={480}
                                height={480}
                                className={`${styles.logo} ${styles[`logo-${index}`]}`}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    )
}