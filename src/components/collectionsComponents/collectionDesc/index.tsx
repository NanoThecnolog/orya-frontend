import styles from './styles.module.scss'

interface DescriptionProps {
    title: string,
    description: string
}

export default function CollectionDescription({ title, description }: DescriptionProps) {
    return (
        <section className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.description}>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    )
}