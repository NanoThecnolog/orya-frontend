import Head from 'next/head'
import styles from './styles.module.scss'
import { useMain } from '@/contexts/mainContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Product } from '@/@types/tray/products'
import { Filter } from '@/services/classes/filter'
import { debug } from '@/utils/DebugLogger'
import Banner from '@/components/CategoriesPage/Banner'
import ProductsByCategory from '@/components/CategoriesPage/ProductByCategory'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { GetServerSideProps } from 'next'

interface CategoryPageProps {
    category: string
}

export default function CategoryPage({ category }: CategoryPageProps) {
    const { productList } = useMain()
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getProducts = async () => {
            const productClass = new Filter(productList)
            const products = await productClass.productsByCategory(category as string)
            debug.log(`produtos filtrados pela categoria ${category ?? "nome vazio"}`, products)
            setProducts(products)
        }
        if (productList.length > 0 && category) getProducts()
        //if(!category) return debug.log("Categoria não encontrada no filtro de produtos por categorias.")
    }, [productList, category])

    const bannerImage = /*`/img/categories/${category}.jpg` || */ "/img/ORYA 16417.jpg"


    return (
        <>
            <Head>
                <title>{`Categoria ${category ? category.toString().toUpperCase() : ""} | Oryá Atelier de Jóias` || 'Carregando categoria...'}</title>
                <meta name='description' content={`Descubra a categoria ${category.toUpperCase()} com joias criadas para refletir estilo, personalidade e significado. Explore peças exclusivas que combinam design autoral, qualidade e sofisticação.`} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <Banner bannerImage={bannerImage} height='80vh' />
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

    const category = Array.isArray(ctx.query.category) ? ctx.query.category[0] : ctx.query.category;

    if (!category)
        return {
            props: { category: null }
        }

    return {
        props: {
            category
        }
    }
}