import Head from 'next/head'
import styles from './styles.module.scss'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import OrderFilter from '@/components/productsComponents/OrderFilter'
import ProductsContainer from '@/components/productsComponents/ProductsContainer'
import { useRouter } from 'next/router'

export default function ProductsPage() {
    const router = useRouter()
    const { name } = router.query



    return (
        <>
            <Head>
                <title>Compre online as nossas Jóias | Oryá Atelier de Jóias</title>
                <meta name='description' content='Explore todas as jóias da ORYÁ: joias autorais que unem sofisticação, identidade e design versátil. Encontre peças criadas para acompanhar seu estilo e realçar sua essência em qualquer ocasião.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <Breadcrumbs />
                <ProductsContainer productName={name as string} />
            </main>
        </>
    )
}