import Head from 'next/head'
import styles from './styles.module.scss'
import Banner from '@/components/CategoriesPage/Banner'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import ProductsByCategory from '@/components/CategoriesPage/ProductByCategory'
import { useMain } from '@/contexts/mainContext'
import { useRouter } from 'next/router'
import { Product } from '@/@types/nuvemshop/products'
import { useEffect, useState } from 'react'
import { Filter } from '@/services/classes/filter'
import { debug } from '@/utils/DebugLogger'

export default function LinePage() {
    const router = useRouter()
    const { productList } = useMain()
    const { line } = router.query
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getProducts = () => {
            const productClass = new Filter(productList)
            const products = productClass.productsByLine(line as string)
            debug.log("produtos filtrados por linha", products)
            setProducts(products)
        }
        if (productList.length > 0 && line) getProducts()
        //if(!line) return debug.log("Categoria não encontrada no filtro de produtos por categorias.")
    }, [productList, line])

    const bannerImage = "/img/ORYA 16535.jpg"
    return (
        <>
            <Head>
                <title>Pagina da linha</title>
                <meta name='description' content='' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <Banner bannerImage={bannerImage} imagePosition='center' height='70vh' />
                <div className={styles.productContainer}>
                    <div className={styles.breadCrumbContainer}>
                        <Breadcrumbs />
                    </div>
                    <ProductsByCategory products={products} />
                </div>
            </main>
        </>
    )
}