import Head from 'next/head'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import CollectionImage from '@/components/collectionsComponents/collectionImage'
import CollectionDescription from '@/components/collectionsComponents/collectionDesc'
import CollectionProducts from '@/components/collectionsComponents/collectionProducts'
import { GetServerSideProps } from 'next'
import { Product, ProductList } from '@/@types/nuvemshop/products'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useMain } from '@/contexts/mainContext'
import { nuvemshop } from '@/services/classes/nuvemshop'

interface CollectionProps {
    productListProps: ProductList
}

export default function Collection({ productListProps }: CollectionProps) {
    const router = useRouter()
    const { collection } = router.query
    const [products, setProducts] = useState<Product[]>([])
    const { productList, setProductList } = useMain()

    useEffect(() => {
        if (productList.length === 0) setProductList(productListProps)
    }, [productList, productListProps])

    const data = {
        title: collection as string,
        description: "Ducil mos vendae el et modi opta doluptam, que rest porroris dolupicimus aliquas alitiis di si ditiusd aeribus.Ihit vid quamus, quid quatquam, ut ipsam, ut voluptatur aut rem ius qui optatis molores nones",
        image: "/img/ORYA 16467.jpg"
    }

    const getProductsByCollection = () => {
        return nuvemshop.getProductsByCollection(productListProps, collection as string)
    }
    useEffect(() => {

        if (!productListProps || productListProps.length === 0 || !(collection as string)) return
        //debug.log(productListProps)
        const productsByCategory = getProductsByCollection()
        setProducts(productsByCategory)
    }, [productListProps, collection])



    return (
        <>
            <Head>
                <title>{`Coleção ${collection?.toString().toUpperCase() || 'Carregando coleção...'}`}</title>
                <meta name='description' content='Coleção Ondyne' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <CollectionImage src={data.image} alt={data.title} />
                <CollectionDescription title={data.title} description={data.description} />
                {products.length > 0 && <CollectionProducts products={products} />}
            </main>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const url = process.env.OFFICIAL_URL
    const { collection } = ctx.query
    try {
        const response = await axios.get<ProductList>(`${url}/api/products`, {
            headers: { "User-Agent": "loja-orya (contato@ericssongomes.com)" }
        })
        //console.log("chamada bem sucedida", response.data.length)
        return {
            props: {
                productListProps: response.data
            }
        }
    } catch (err) {
        console.error("Erro no getServerSideProps na pagina collection", err)
        return {
            props: {
                productListProps: [] as unknown as ProductList
            }
        }
    }
}