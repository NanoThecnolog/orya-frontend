import { CollectionsComponentProps } from '@/@types/collections'
import styles from './styles.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
    collections: CollectionsComponentProps[]
}

export default function CollectionsComponent({ collections }: Props) {

    const router = useRouter()

    const handleClick = (collection: string): void => {
        router.push(`/collections/collection/${collection}`)
    }
    return (
        <section className={styles.container}>
            <div className={styles.titlePage}>
                <h1>Coleções</h1>
            </div>
            {
                collections.map((collection, index) =>
                    <div
                        key={`${collection.title}${index}`}
                        className={styles.collectionContainer}
                        onClick={() => handleClick(collection.title)}
                    >
                        <div className={styles.imageContainer}>
                            {
                                collection.images.map(img => <Image
                                    key={img}
                                    src={img}
                                    alt={img}
                                    fill
                                    priority={false}
                                    className={styles.image}
                                />)
                            }
                        </div>
                        <div className={styles.infoContainer}>
                            <h2>{collection.title}</h2>
                            <p>{collection.description}</p>
                        </div>
                    </div>
                )
            }
        </section>
    )
}