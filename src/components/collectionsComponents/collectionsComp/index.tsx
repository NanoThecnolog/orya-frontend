import { CollectionsComponentProps } from '@/@types/collections'
import styles from './styles.module.scss'
import Image from 'next/image'

interface Props {
    collections: CollectionsComponentProps[]
}

export default function CollectionsComponent({ collections }: Props) {
    return (
        <section className={styles.container}>
            {
                collections.map((collection, index) =>
                    <div key={`${collection.title}${index}`}>
                        <div>
                            <Image
                                src={collection.images[0]}
                                alt={collection.title}
                                fill
                                priority={false}
                            />
                        </div>
                        <div>
                            <h2>{collection.title}</h2>
                            <p>{collection.description}</p>
                        </div>
                    </div>
                )
            }
        </section>
    )
}