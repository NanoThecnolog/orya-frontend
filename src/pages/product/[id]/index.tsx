import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { Product, ProductList } from '@/@types/nuvemshop/products'
import ProductImages from '@/components/productPage/ProductImages'
import ProductInfo from '@/components/productPage/ProductInfo'
import { useMain } from '@/contexts/mainContext'
import { useEffect, useMemo, useState } from 'react'
import { nuvemshop } from '@/services/classes/nuvemshop'
import RelatedProducts from '@/components/productPage/RelatedProducts'

interface ProductProps {
    product: Product | null
    productList: ProductList
}
export default function ProductPage({ product, productList }: ProductProps) {
    //const { productList } = useMain()
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

    const getRelatedProducts = useMemo(() => {
        if (!product) return
        const related = nuvemshop.relatedProductsByCategory(product, productList)
        setRelatedProducts(related)
    }, [product, productList])

    /*useEffect(() => {
        if (product && productList) getRelatedProducts()
    }, [product, productList])*/

    if (!product) return <div style={{ color: "black" }}>Produto não encontrado.</div>
    return (
        <>
            <Head>
                <title>{product?.name.pt} | Comprar na Oryá</title>
                <meta name='description' content={product?.description.pt ?? "Detalhes do produto"} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <ProductInfo info={product} />
                {
                    relatedProducts.length > 0 &&
                    <RelatedProducts related={relatedProducts} />
                }
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id;
    const url = process.env.OFFICIAL_URL

    try {
        const [productRes, productListRes] = await Promise.all([
            axios.get<Product>(`${url}/api/product/${id}`),
            axios.get<ProductList>(`${url}/api/products`)
        ])


        return {
            props: {
                product: productRes.data,
                productList: productListRes.data
            }
        }
    } catch (err) {
        console.error("Erro no getServerSideProps da pagina product", err)
        return {
            props: {
                product: null,
                productList: [] as unknown as ProductList
            }
        }
    }
}