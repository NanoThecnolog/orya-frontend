import { useMain } from '@/contexts/mainContext'
import MainFilter from '../MainFilter'
import Products from '../Products'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { ProductList } from '@/@types/nuvemshop/products'

export default function ProductsContainer() {
    const { productList } = useMain()
    const [filtered, setFiltered] = useState<ProductList>([])

    useEffect(() => {
        setFiltered(productList)
    }, [productList])
    return (
        <section className={styles.container}>
            <MainFilter products={productList} updateFiltered={setFiltered} />
            <Products products={filtered} />
        </section>
    )
}