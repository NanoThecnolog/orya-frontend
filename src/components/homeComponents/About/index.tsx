import Image from 'next/image'
import styles from './styles.module.scss'

export default function About() {
    const image = "/logo/SEM FUNDO/ORYÁ_LOGO SF_V1_1.png"
    return (
        <section className={styles.container}>
            <div className={styles.logoContainer}>
                <div className={styles.imageContainer}>
                    <Image
                        src={image}
                        alt='Logomarca Oryá'
                        fill
                        priority={false}
                        className={styles.image}
                    />
                </div>
            </div>
            <div className={styles.textContainer}>
                <p className={styles.text}>
                    De origem indígena, a combinação das palavras ouro
                    e &quot;ykerá&quot; (irmã) representa no nome a proximidade,
                    a parceria e o vínculo das fundadoras. A marca foi
                    criada para conectar a mulher contemporânea à sua
                    essência, oferecendo joias que vão além do ordinário
                    e se tornam uma forma de expressão pessoal.
                </p>
            </div>
        </section>
    )
}