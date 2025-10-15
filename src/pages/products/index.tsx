import Head from 'next/head'
import styles from './styles.module.scss'
import { Breadcrumbs } from '@/components/productsComponents/Breadcrumbs'
import OrderFilter from '@/components/productsComponents/OrderFilter'
import ProductsContainer from '@/components/productsComponents/ProductsContainer'

export default function Products() {

    return (
        <>
            <Head>
                <title>Compre online produtos da Oryá</title>
                <meta name='description' content='Página de produtos da Oryá' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <Breadcrumbs />
                <section className={styles.productContainer}>
                    <OrderFilter />
                    <ProductsContainer />
                </section>
            </main>
        </>
    )
}