import Head from 'next/head'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import CollectionImage from '@/components/collectionsComponents/collectionImage'
import { products } from '@/common/variables/products'
import CollectionDescription from '@/components/collectionsComponents/collectionDesc'

export default function Collection() {
    const router = useRouter()
    const { collection } = router.query

    const data = {
        title: collection as string,
        description: "Ducil mos vendae el et modi opta doluptam, que rest porroris dolupicimus aliquas alitiis di si ditiusd aeribus.Ihit vid quamus, quid quatquam, ut ipsam, ut voluptatur aut rem ius qui optatis molores nones",
        image: "/img/ORYA 16467.jpg",
        products: products
    }
    return (
        <>
            <Head>
                <title>Collection Name</title>
                <meta name='description' content='Description sobre a collection' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <CollectionImage src={data.image} alt={data.title} />
                <CollectionDescription title={data.title} description={data.description} />
            </main>
        </>
    )
}