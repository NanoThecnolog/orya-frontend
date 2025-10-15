import Image from 'next/image'
import styles from './styles.module.scss'
import { CollectionsProps } from '@/@types/collections'

interface CollectionProps {
    collection: CollectionsProps
}

export default function BannerCollection({ collection }: CollectionProps) {
    return (
        <section className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    src={collection.image}
                    fill
                    alt={collection.name}
                    sizes="100vw"
                    className={styles.image}
                    priority={false}
                />
                <h2>{collection.name}</h2>
                <h2>Collection</h2>
            </div>
        </section>
    )
}