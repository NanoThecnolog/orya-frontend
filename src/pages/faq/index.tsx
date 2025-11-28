import Head from 'next/head'
import styles from './styles.module.scss'
import Faq from '@/components/FAQ'
import { faqData } from '@/common/variables/faq'

export default function FAQPage() {
    return (
        <>
            <Head>
                <title>Loja Oryá</title>
                <meta name="description" content="Loja de joias online" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.container}>
                <Faq data={faqData} />
            </main>
        </>

    )
}