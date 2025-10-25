import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import Image from 'next/image'
import { format } from '@/utils/formatContent'

interface CompProps {
    products: Product[]
}

export default function Products({ products }: CompProps) {
    return (
        <section className={styles.container}>
            {products.map(product => {
                const price = product?.variants?.[0]?.price
                const image = product?.images?.[0]?.src ?? "/img/sem-foto.png"
                return (
                    <div key={product.id} className={styles.productContainer}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={image}
                                alt={product.name.pt}
                                fill
                                priority={false}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.infoContainer}>
                            <h4>{product.name.pt}</h4>
                            <p>{format.price(price)}</p>
                            <p>{format.discount(price, 10)}</p>
                        </div>
                    </div>
                )
            }
            )}
        </section>
    )
}