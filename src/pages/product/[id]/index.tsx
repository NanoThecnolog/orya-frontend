import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { Product } from '@/@types/nuvemshop/products'
import ProductImages from '@/components/productPage/ProductImages'
import ProductInfo from '@/components/productPage/ProductInfo'
import { useMain } from '@/contexts/mainContext'
import { useEffect, useState } from 'react'
import { nuvemshop } from '@/services/classes/nuvemshop'
import RelatedProducts from '@/components/productPage/RelatedProducts'

interface ProductProps {
    product: Product | null
}
export default function ProductPage({ product }: ProductProps) {
    const { productList } = useMain()
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

    const getRelatedProducts = async () => {
        if (!product) return
        const related = nuvemshop.relatedProductsByCategory(product, productList)
        setRelatedProducts(related)
    }
    useEffect(() => {
        getRelatedProducts()
    }, [product, productList])

    if (!product) return <div>Produto não encontrado.</div>
    return (
        <>
            <Head>
                <title>{product?.name.pt}</title>
                <meta name='description' content={product?.description.pt} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <ProductInfo info={product} />
                <RelatedProducts related={relatedProducts} />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id;
    const url = process.env.OFFICIAL_URL

    try {
        const response = await axios.get<Product>(`${url}/product/${id}`)
        return {
            props: { product: response.data }
        }
    } catch (err) {
        return {
            props: { product: null }
        }
    }
}