import Head from 'next/head'
import styles from './styles.module.scss'

export default function Category() {
    return (
        <>
            <Head>
                <title>Categoria</title>
                <meta name='description' content='Pagina da categoria' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
            </main>
        </>
    )
}