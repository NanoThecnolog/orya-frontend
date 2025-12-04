import Head from 'next/head'
import styles from './styles.module.scss'
import Banner from '@/components/CategoriesPage/Banner'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import ProductsByCategory from '@/components/CategoriesPage/ProductByCategory'
import { useMain } from '@/contexts/mainContext'
import { useRouter } from 'next/router'
import { Product } from '@/@types/tray/products'
import { useEffect, useState } from 'react'
import { Filter } from '@/services/classes/filter'
import { debug } from '@/utils/DebugLogger'
import { GetServerSideProps } from 'next'

interface LinePageProps {
    line: string | null
}

export default function LinePage({ line }: LinePageProps) {
    const router = useRouter()
    const { productList } = useMain()
    //const { line } = router.query
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getProducts = async () => {
            const productClass = new Filter(productList)
            const products = await productClass.productsByLine(line as string)
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
                <title>Linha {line?.toUpperCase()} | Oryá Atelier de Jóias</title>
                <meta name='description' content='Coleções que expressam estilo, significado e autenticidade. Cada linha com peças exclusivas criadas para celebrar diferentes formas de beleza e identidade.' />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const line = Array.isArray(ctx.query.line) ? ctx.query.line[0] : ctx.query.line;

    if (!line)
        return {
            props: { line: null }
        }

    return {
        props: {
            line
        }
    }
}