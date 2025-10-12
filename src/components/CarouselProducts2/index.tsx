import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { ProductProps } from '@/common/variables/products'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { format } from '@/utils/formatContent'
import { Product, ProductList } from '@/@types/nuvemshop/products'
import SendCartButton from '../ui/CartButton'
import { useRouter } from 'next/navigation'
import { CartProps, useMain } from '@/contexts/mainContext'

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
    const router = useRouter()
    const { cartItems, setCartItems } = useMain()

    const pushProductPage = (id: number) => {
        router.push(`/product/${id}`)
    }

    const handleClick = (product: Product) => {
        const hasItem = cartItems.find(item => item.product.id === product.id)
        if (hasItem) {
            setCartItems((prev) =>
                prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                )
            );
        } else {
            setCartItems((prev) => [...prev, { product, amount: 1 }]);
        }
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
                        slidesPerView={4}
                        initialSlide={3}
                        className={styles.carousel}
                    >
                        {products && products.map((product, index) => {
                            const price = format.price(product.variants?.[0]?.price)
                            const discount = format.discount(product.variants?.[0]?.price, 10)
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
                                            onClick={() => pushProductPage(product.id)}
                                        />
                                        <div className={styles.buttonContainer}>
                                            <SendCartButton handleClick={() => handleClick(product)} />
                                        </div>
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