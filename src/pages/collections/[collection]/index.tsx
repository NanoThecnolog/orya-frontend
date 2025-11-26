import Head from 'next/head'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import CollectionImage from '@/components/collectionsComponents/collectionImage'
import CollectionDescription from '@/components/collectionsComponents/collectionDesc'
import CollectionProducts from '@/components/collectionsComponents/collectionProducts'
import { GetServerSideProps } from 'next'
import { Product, ProductList } from '@/@types/tray/products'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useMain } from '@/contexts/mainContext'
import { apiTray } from '@/services/classes/IntegraApi'

interface CollectionProps {
    productListProps: ProductList
}

export default function CollectionPage({ productListProps }: CollectionProps) {
    const router = useRouter()
    const { collection } = router.query
    const [products, setProducts] = useState<Product[]>([])
    const { productList, setProductList, menu } = useMain()

    useEffect(() => {
        if (productList.length === 0) setProductList(productListProps)
    }, [productList, productListProps])

    const data = {
        title: collection as string,
        description: "Ducil mos vendae el et modi opta doluptam, que rest porroris dolupicimus aliquas alitiis di si ditiusd aeribus.Ihit vid quamus, quid quatquam, ut ipsam, ut voluptatur aut rem ius qui optatis molores nones",
        image: "/img/ORYA 16467.jpg"
    }

    //criar rota no backend do next pra retornar produtos por coleções e por linhas
    const getProductsByCollection = async () => {
        const getDropMenu = menu.flatMap(m => m.dropMenu ?? []).find(drop => drop.title.toLowerCase().includes(collection as string))
        if (!getDropMenu) return
        console.log(getDropMenu)

        try {
            const response = await axios.get<Product[]>(`/api/collections/${getDropMenu?.id}`)
            const productsByCollection = response.data
            setProducts(productsByCollection)
        } catch (err) {
            console.error("Erro ao buscar produtos por coleção")
            setProducts([])
        }
    }
    useEffect(() => {
        if (!productListProps || productListProps.length === 0 || !(collection as string)) return
        getProductsByCollection()
    }, [menu])



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
        const response = await axios.get<ProductList>(`${url}/api/products`)
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