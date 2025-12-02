import Head from 'next/head'
import styles from './styles.module.scss'
import Image from 'next/image'

export default function AboutPage() {
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
                                src={"/img/1Q3A6558.jpg"}
                                alt=''
                                fill
                                priority
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.aboutText}>
                            <h2>Nós somos a Oryá!</h2>
                            <p>Apresentamos a ORYÁ: joias que são uma extensão da personalidade, unindo sofisticação e singularidade. Cada peça foi criada para conectar a mulher contemporânea à sua essência, indo além do ordinário para se tornar uma forma de expressão pessoal.</p>
                            <p>Inspirado nas raízes indígenas das fundadoras, o nome ORYÁ surge da união das palavras “Ouro” e “Ykerá” (irmã), representando a proximidade, a parceria e o vínculo profundo entre as irmãs Tainá e Raira Mioto.</p>
                            <p>A ORYÁ cria joias que se tornam parte da história e da celebração única de cada mulher, refletindo sua essência e personalidade.</p>
                        </div>
                    </div>
                    <div className={styles.aboutContainer}>
                        <div className={styles.aboutText}>
                            <h2>
                                Behind our process
                            </h2>
                            <p>
                                Cada peça é uma história que se entrelaça com a sua, criada para refletir sua autenticidade e te acompanhar nos momentos que realmente importam. Investimos em qualidade, produto e design versátil para que nossas joias acompanhem seu dia a dia com sofisticação e praticidade. Cada joia nasce do encontro entre técnica, criatividade e significado.
                            </p>
                        </div>
                        <div className={styles.aboutVideo}>
                            <video
                                src='/video/aboutVideo.mp4'
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload='auto'
                            ></video>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}