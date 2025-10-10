import Image from 'next/image'
import styles from './styles.module.scss'

interface ImageProps {
    src: string,
    alt?: string
}

export default function CollectionImage({ src, alt }: ImageProps) {
    return (
        <section className={styles.container}>
            <Image
                src={src}
                alt={alt ?? "Imagem da Coleção"}
                fill
                priority={false}
                className={styles.image}
            />
        </section>
    )
}