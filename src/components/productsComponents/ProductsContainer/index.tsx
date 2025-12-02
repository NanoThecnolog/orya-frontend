import { useMain } from '@/contexts/mainContext'
import MainFilter from '../MainFilter'
import Products from '../Products'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { ProductList } from '@/@types/tray/products'

interface ProductPageProps {
    productName?: string
}
export default function ProductsContainer({ productName }: ProductPageProps) {
    const { productList } = useMain()
    const [filtered, setFiltered] = useState<ProductList>([])



    const normalize = (value: string) =>
        value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const getProductByName = () => {
        if (!productName) return
        const name = normalize(productName)

        const product = productList.filter(p => normalize(p.name).includes(name))
        if (!product) return
        setFiltered(product)
    }

    useEffect(() => {
        if (!productName) setFiltered(productList)
        else getProductByName()
    }, [productName, productList])
    return (
        <section className={styles.container}>
            <MainFilter products={productList} updateFiltered={setFiltered} />
            <Products products={filtered} />
        </section>
    )
}