import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { ProductProps } from '@/common/variables/products'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { format } from '@/utils/formatContent'
import { Product, ProductList } from '@/@types/nuvemshop/products'
import { useRouter } from 'next/navigation'
import { useMain } from '@/contexts/mainContext'
import SendCartButton from '@/components/ui/CartButton'

interface CarouselProductProps {
    products: ProductList | null
    navigation?: boolean
    pagination?: boolean
    autoplay?: boolean
    loop?: boolean
    text?: boolean
}

export default function CarouselProducts({
    products,
    navigation = true,
    pagination = false,
    autoplay = false,
    loop = true,
    text = false
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
                {text && <div className={styles.textContainer}>
                    <h2>&quot;Cada peça é uma história que se entrelaça com a sua, criada para refletir sua autenticidade e te acompanhar nos momentos que importam.&quot;</h2>
                </div>}
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
                        {
                            products &&
                            products.map((product, index) => {
                                const price = format.price(product.variants?.[0]?.price ?? null)
                                const discount = format.discount(product.variants?.[0]?.price ?? null, 10)
                                const image = product.images?.[0]?.src ?? "/img/sem-foto.png"
                                return (
                                    <SwiperSlide key={index} className={styles.slide}>
                                        <div className={styles.imageContainer}>
                                            <Image
                                                src={image}
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
                                            <p>{discount}</p>
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