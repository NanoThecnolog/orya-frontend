import Head from 'next/head'
import styles from './styles.module.scss'
import Image from 'next/image'

export default function ConstrucaoPage() {
    return (
        <>
            <Head>
                <title></title>
                <meta name='description' content='' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image src="/logo/sem-fundo/ORYA_LOGO_SF_V1_1.png" fill alt="Logomarca Oryá" className={styles.image} />
                </div>
                <h1>Site em Construção</h1>
                <p>Estamos trabalhando para trazer novidades em breve.</p>
            </main>
        </>
    )
}