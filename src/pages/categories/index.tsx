import Head from 'next/head'
import styles from './styles.module.scss'

export default function Categories() {
    return (
        <>
            <Head>
                <title>Categorias</title>
                <meta name='description' content='Pagina de categorias' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
            </main>
        </>
    )
}