import Image from 'next/image'
import styles from './styles.module.scss'

export default function Banner() {
    return (
        <section className={styles.container}>
            <div className={styles.imageContainer}>
                <Image
                    src={"/img/ORYA 16417.jpg"}
                    alt='Banner de Categorias'
                    fill
                    priority
                    className={styles.image}
                />
            </div>
        </section>
    )
}