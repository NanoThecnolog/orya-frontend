import Image from 'next/image'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { ProductImage } from '@/@types/nuvemshop/products'

interface ProductImagesProps {
    images: ProductImage[]
}

export default function ProductImages({ images }: ProductImagesProps) {
    const [activeImage, setActiveImage] = useState<string>(images[0].src)
    useEffect(() => {
        setActiveImage(images[0].src)
    }, [images])
    return (
        <div className={styles.container}>
            <div className={styles.thumbs}>
                {images.map((img, index) =>
                    <div
                        key={index}
                        className={`${styles.thumb} ${img.src === activeImage ? styles.active : ""}`}
                        onClick={() => {
                            setActiveImage(img.src)
                        }}
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