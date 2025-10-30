import Image from 'next/image'
import styles from './styles.module.scss'

interface CompProps {
    bannerImage: string,
    imagePosition?: string,
    height?: string
}

export default function Banner({ bannerImage, imagePosition, height }: CompProps) {
    return (
        <section className={styles.container}>
            <div className={styles.imageContainer} style={{ height: height ? height : "100vh" }}>
                <Image
                    src={bannerImage}
                    alt='Banner de Categorias'
                    fill
                    priority
                    className={styles.image}
                    style={imagePosition ? { objectPosition: imagePosition } : {}}
                />
            </div>
        </section>
    )
}