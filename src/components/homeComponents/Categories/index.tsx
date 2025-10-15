import Image from 'next/image'
import styles from './styles.module.scss'
import { CategoryProps } from '@/@types/categories'

interface Props {
    categories: CategoryProps[]
}

export default function Categories({ categories }: Props) {
    return (
        <section className={styles.container}>
            {categories.map((category, index) =>
                <div key={index} className={styles.categoryContainer}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            priority={false}
                            className={styles.image}
                        />
                        <p className={styles.name}>{category.name}</p>
                    </div>
                </div>
            )}
        </section>
    )
}