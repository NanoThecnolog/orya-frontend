import Head from 'next/head'
import styles from './styles.module.scss'
import Faq from '@/components/FAQ'
import { faqData } from '@/common/variables/faq'

export default function FAQPage() {
    return (
        <>
            <Head>
                <title>Perguntas Frequêntes | Orya Atelier de Jóias</title>
                <meta name="description" content="Encontre respostas rápidas para as perguntas frequentes da ORYÁ. Informações claras sobre pedidos, entregas, cuidados com as joias e processos da marca para facilitar sua experiência." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.container}>
                <Faq data={faqData} />
            </main>
        </>

    )
}