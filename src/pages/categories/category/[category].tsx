import Head from 'next/head'
import styles from './styles.module.scss'
import { useMain } from '@/contexts/mainContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Product } from '@/@types/nuvemshop/products'
import { Filter } from '@/services/classes/filter'
import { debug } from '@/utils/DebugLogger'
import Banner from '@/components/CategoriesPage/Banner'
import ProductsByCategory from '@/components/CategoriesPage/ProductByCategory'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export default function Category() {
    const router = useRouter()
    const { productList } = useMain()
    const { category } = router.query
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getProducts = () => {
            const productClass = new Filter(productList)
            const products = productClass.productsByCategory(category as string)
            debug.log("produtos filtrados pela categoria", products)
            setProducts(products)
        }
        if (productList.length > 0 && category) getProducts()
        //if(!category) return debug.log("Categoria não encontrada no filtro de produtos por categorias.")
    }, [productList, category])


    return (
        <>
            <Head>
                <title>{`Categoria ${category ? category.toString() : ""} | Oryá Atelier` || 'Carregando categoria...'}</title>
                <meta name='description' content='Pagina da categoria' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <Banner />
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