import Image from 'next/image'
import styles from './styles.module.scss'

export default function RingSize() {
    return (
        <section className={styles.container}>
            <Image
                src={'/img/medida-anel.jpeg'}
                fill
                alt='Medidas de anel'
                className={styles.image}
            />
        </section>
    )
}