import Image from 'next/image'
import styles from './styles.module.scss'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Swiper as SwiperCore } from 'swiper'
import { ProductDetails } from '@/@types/tray/ProductDetails'
import { productsImages } from '@/common/variables/products'
import { useRouter } from 'next/navigation'
import { Functions } from '@/utils/functions'

interface ProductComponentProps {
    product: ProductDetails
}

export default function ProductImages({ product }: ProductComponentProps) {
    const router = useRouter()
    const functions = new Functions(router)
    const swiperRef = useRef<SwiperCore | null>(null)

    const [activeImage, setActiveImage] = useState<string>("")
    const [codes, setCodes] = useState<number[]>([])

    const fallback = "/img/sem-foto.png"

    const getImagePath = (code: number | undefined) => typeof code === "number" ? functions.imagePath(code) : fallback

    useEffect(() => {
        const data = productsImages.find(i => i.trayID === product.Product.id)

        if (!data) {
            // fallback para imagens do produto na tray
            if (product.Product.ProductImage.length > 0) {
                setActiveImage(product.Product.ProductImage[0].https)
            }
            return
        }

        const list = data.codeImg
        setCodes(list)
        setActiveImage(getImagePath(list[0]))
    }, [product])

    const handleThumbClick = (code: number, index: number) => {
        setActiveImage(getImagePath(code))
        swiperRef.current?.slideTo(index)
    }

    if (codes.length === 0 && product.Product.ProductImage.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                Produto sem imagem
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {/*Thumbs das imagens*/}
            <div className={styles.thumbs}>
                {codes.map((code, index) => {
                    const src = getImagePath(code)
                    return (
                        <div
                            key={index}
                            className={`${styles.thumb} ${src === activeImage ? styles.active : ""}`}
                            onClick={() => handleThumbClick(code, index)}
                        >
                            <Image
                                src={src}
                                alt={`Imagem ${index + 1}`}
                                fill
                                priority={false}
                                className={styles.image}
                            />
                        </div>
                    )
                })}
            </div>
            {/*Imagem Principal */}
            <div className={styles.mainImageContainer}>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={1}
                    className={styles.carousel}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveImage(getImagePath(codes[swiper.activeIndex]))}
                    observer
                    observeParents
                    onInit={(swiper: SwiperCore) => swiper.update()}
                >
                    {
                        codes.map(code => {
                            const src = getImagePath(code)
                            return (
                                <SwiperSlide
                                    key={code}
                                    className={styles.slide}>
                                    <Image
                                        src={src}
                                        alt="Imagem do produto"
                                        fill
                                        priority
                                        className={styles.mainImage}
                                    />
                                </SwiperSlide>
                            )
                        }

                        )
                    }
                </Swiper>
            </div>
        </div>
    )
}