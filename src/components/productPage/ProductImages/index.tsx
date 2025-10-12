import Image from 'next/image'
import styles from './styles.module.scss'
import { useState } from 'react'
import { ProductImage } from '@/@types/nuvemshop/products'

interface ProductImagesProps {
    images: ProductImage[]
}

export default function ProductImages({ images }: ProductImagesProps) {
    const [activeImage, setActiveImage] = useState(images[0])
    return (
        <div className={styles.container}>
            <div className={styles.thumbs}>
                {images.map((src, index) =>
                    <div
                        key={index}
                        className={`${styles.thumb} ${src === activeImage ? styles.active : ""}`}
                        onClick={() => setActiveImage(src)}
                    >
                        <Image
                            src={src}
                            alt={`Imagem ${index + 1}`}
                            fill
                            priority={false}
                            className={styles.image}
                        />
                    </div>
                )}
            </div>
            <div>
                <Image
                    src={activeImage}
                    alt="Imagem do produto"
                    fill
                    priority
                    className={styles.mainImage}
                />
            </div>
        </div>
    )
}