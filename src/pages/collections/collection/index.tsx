import Head from 'next/head'
import styles from './styles.module.scss'

export default function Collection() {
    return (
        <>
            <Head>
                <title>Collection Name</title>
                <meta name='description' content='Description sobre a collection' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>

            </main>
        </>
    )
}