import Image from 'next/image'
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react'
import { ProductImage } from '@/@types/nuvemshop/products'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { GrNext, GrPrevious } from "react-icons/gr";
import { Swiper as SwiperCore } from 'swiper'

interface ProductImagesProps {
    images: ProductImage[]
}

export default function ProductImages({ images }: ProductImagesProps) {
    const [activeImage, setActiveImage] = useState<string>(images[0].src)
    const swiperRef = useRef<SwiperCore | null>(null)



    useEffect(() => {
        setActiveImage(images[0].src)
    }, [images])

    const handleThumbClick = (src: string, index: number) => {
        setActiveImage(src)
        swiperRef.current?.slideTo(index)
    }
    return (
        <div className={styles.container}>
            <div className={styles.thumbs}>
                {images.map((img, index) =>
                    <div
                        key={index}
                        className={`${styles.thumb} ${img.src === activeImage ? styles.active : ""}`}
                        onClick={() => handleThumbClick(img.src, index)}
                    >
                        <Image
                            src={img.src}
                            alt={`Imagem ${index + 1}`}
                            fill
                            priority={false}
                            className={styles.image}
                        />
                    </div>
                )}
            </div>
            <div className={styles.mainImageContainer}>
                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    slidesPerView={1}
                    className={styles.carousel}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveImage(images[swiper.activeIndex].src)}
                >
                    {
                        images.map((img) =>
                            <SwiperSlide
                                key={img.id}
                                className={styles.slide}>
                                <Image
                                    src={img.src}
                                    alt="Imagem do produto"
                                    fill
                                    priority
                                    className={styles.mainImage}
                                />

                            </SwiperSlide>

                        )
                    }
                </Swiper>
            </div>
        </div>
    )
}