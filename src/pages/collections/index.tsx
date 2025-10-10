import Head from 'next/head'
import styles from './styles.module.scss'
import Image from 'next/image'
import { collections } from '@/common/variables/collections'
import CollectionsComponent from '@/components/collectionsComponents/collectionsComp'

export default function Collections() {


    return (
        <>
            <Head>
                <title>Coleções</title>
                <meta name='description' content='Página sobre coleções' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <CollectionsComponent collections={collections} />
            </main>
        </>
    )
}