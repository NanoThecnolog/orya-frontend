import Head from 'next/head'
import styles from './styles.module.scss'

export default function LinePage() {
    return (
        <>
            <Head>
                <title>Pagina da linha</title>
                <meta name='description' content='' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                pagina da linha
            </main>
        </>
    )
}