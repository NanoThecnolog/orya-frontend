import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { Product, ProductList } from '@/@types/tray/products'
import ProductImages from '@/components/productPage/ProductImages'
import ProductInfo from '@/components/productPage/ProductInfo'
import { useMain } from '@/contexts/mainContext'
import { useEffect, useMemo, useState } from 'react'
import RelatedProducts from '@/components/productPage/RelatedProducts'
import { apiTray } from '@/services/classes/IntegraApi'
import { ProductDetails } from '@/@types/tray/ProductDetails'
import { debug } from '@/utils/DebugLogger'

interface ProductProps {
    product: ProductDetails | null
    productList: ProductList
}
export default function ProductPage({ product, productList }: ProductProps) {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

    const getRelatedProducts = async () => {
        if (!product) return
        try {
            const response = await axios.post<Product[]>(`/api/product/related`,
                {
                    product,
                    productList
                }
            )
            const data = response.data
            if (data.length > 0) setRelatedProducts(data)
        } catch (err) {
            debug.log("Erro ao buscar produtos relacionados na pagina do produto", err)
            throw new Error("Erro ao buscar produtos relacionados na pagina do produto")
        }
    }

    useMemo(() => {
        getRelatedProducts()
    }, [product, productList])

    if (!product) return <main className={styles.container}>Produto não encontrado.</main>
    return (
        <>
            <Head>
                <title>{product.Product.name} | Comprar na Oryá</title>
                <meta name='description' content={product.Product.description ?? "Detalhes do produto"} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <ProductInfo product={product} />
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
    const shortcut = Array.isArray(ctx.query.shortcut) ? ctx.query.shortcut[0] : ctx.query.shortcut;
    const url = process.env.OFFICIAL_URL

    try {
        const [productRes, productListRes] = await Promise.all([
            axios.get<ProductDetails>(`${url}/api/product/${id}`),
            axios.get<ProductList>(`${url}/api/products`),
        ])
        /*
        const product = productListRes.data.find(product => product.shortcut === shortcut)
        if (!product) return {
            props: {
                product: null,
                productList: productListRes.data
            }
        }
        */
        //const getProductDetails = await axios.get(`${url}/api/product/${productRes.data.Product.id}`)
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