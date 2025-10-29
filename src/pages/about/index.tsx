import Head from 'next/head'
import styles from './styles.module.scss'
import Image from 'next/image'

export default function About() {
    return (
        <>
            <Head>
                <title>Sobre Nós</title>
                <meta name='description' content='Página sobre a empresa' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <section className={styles.sectionContainer}>
                    <div>
                        <h1>Sobre</h1>
                    </div>
                    <div className={styles.aboutContainer}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={"/img/ORYA 16513.jpg"}
                                alt=''
                                fill
                                priority
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.aboutText}>
                            <h2>Nós somos a oryá!</h2>
                            <p>Apresentamos a ORYÁ: joias que são uma extensão da personalidade, unindo sofisticação e singularidade. Cada peça foi criada para conectar a mulher contemporânea à sua essência, indo além do ordinário para se tornar uma forma de expressão pessoal.</p>
                            <p>Inspirado nas raízes indígenas das fundadoras, o nome ORYÁ surge da união das palavras “Ouro” e “Ykerá” (irmã), representando a proximidade, a parceria e o vínculo profundo entre as irmãs Tainá e Raira Mioto.</p>
                            <p>A ORYÁ cria joias que se tornam parte da história e da celebração única de cada mulher, refletindo sua essência e personalidade.</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}