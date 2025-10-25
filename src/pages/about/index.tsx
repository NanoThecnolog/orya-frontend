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
                            <p>
                                Vitatiis etur? Cus ut apis dolut antur?
                                Ro ma nonsece rnatur, simolorepta doluptat.
                                Ximporatumet lame vel et aut lam quiscillaut rehent
                                venihil latempe rferum velibus, opti qui officti
                                onemquat asimintio doloribus, conseni magnimus,
                                consequia et doloreic tem acia essimus, assum
                                voluptibus voluptatur?
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}