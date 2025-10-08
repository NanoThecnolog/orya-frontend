import Image from 'next/image'
import styles from './styles.module.scss'

interface Props {
    image: string
}

export default function Banner({ image }: Props) {
    return (
        <section className={styles.container}>
            <Image
                src={image}
                alt="Banner Image"
                fill
                className={styles.image}
                priority={false}
                sizes='100vw'
            />
        </section>
    )
}