import { Breadcrumbs } from '@/components/productsComponents/Breadcrumbs'
import styles from './styles.module.scss'
import { Product } from '@/@types/nuvemshop/products'
import { Swiper, SwiperSlide } from 'swiper/react'
import { format } from '@/utils/formatContent'
import Image from 'next/image'
import { useMain } from '@/contexts/mainContext'
import { Ecommerce } from '@/services/classes/ecommerce'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface CompProps {
    products: Product[]
}

export default function CollectionProducts({ products }: CompProps) {
    const router = useRouter()
    const { cartItems, setCartItems } = useMain()

    const handleClick = (product: Product): void => {
        const ecommerce = new Ecommerce(cartItems, setCartItems)
        ecommerce.addToCart(product)

    }
    const goToProductPage = (id: number) => {
        router.push(`/product/${id}`)
    }
    return (
        <section className={styles.container}>
            <Breadcrumbs />
            <div className={styles.productsContainer}>
                {products.map((product) => {
                    const price = format.price(product.variants?.[0]?.price ?? null)
                    const discount = format.discount(product.variants?.[0]?.price ?? null, 10)
                    const image = product.images?.[0]?.src ?? "/img/sem-foto.png"
                    return (
                        <div key={product.id} className={styles.productContainer}>
                            <div className={styles.imageContainer} onClick={() => goToProductPage(product.id)}>
                                <Image
                                    src={image}
                                    alt={product.name.pt || "Imagem do produto"}
                                    fill
                                    priority={false}
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.infoContainer}>
                                <h3>{(product.name.pt).toUpperCase()}</h3>
                                <div className={styles.priceContainer}>
                                    <h4>{price}</h4>
                                    <h5>{discount}</h5>
                                </div>
                            </div>
                            <div className={styles.buttonContainer} onClick={() => handleClick(product)}>
                                <div className={styles.buttonInfo}>
                                    <h3>{(product.name.pt).toUpperCase()}</h3>
                                    <h4>{price}</h4>
                                </div>
                                <button type='button'>Adicionar ao carrinho!</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}