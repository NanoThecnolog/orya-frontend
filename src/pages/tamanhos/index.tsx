import Head from 'next/head'
import styles from './styles.module.scss'
import RingSize from '@/components/ui/RingSize'

export default function RingSizePage() {
    return (
        <>
            <Head>
                <title>Tamanhos | Loja Oryá</title>
                <meta name='description' content='Guia prático para medir o tamanho do seu anel com precisão. Aprenda métodos simples para identificar a medida ideal e garantir conforto e perfeito encaixe nas joias ORYÁ.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <RingSize />
            </main>
        </>
    )
}