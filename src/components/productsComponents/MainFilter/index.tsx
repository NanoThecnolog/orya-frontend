import { Category, ProductList } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Filter } from '@/services/classes/filter'

interface CompProps {
    products: ProductList,
    updateFiltered: Dispatch<SetStateAction<ProductList>>
}


export default function MainFilter({ products, updateFiltered }: CompProps) {
    const [fromPrice, setFromPrice] = useState<string>("")
    const [toPrice, setToPrice] = useState<string>("")
    const [categories, setCategories] = useState<Category[]>([])
    const [collections, setCollections] = useState<Category[]>([])
    const [lines, setLines] = useState<Category[]>([])

    useEffect(() => {
        const setStates = () => {
            const filter = new Filter(products)

            const categories = filter.getCategories()
            setCategories(categories)

            const collections = filter.getCollections()
            setCollections(collections)

            const lines = filter.getLines()
            setLines(lines)
        }
        if (products && products.length > 0) setStates()
    }, [products])

    const filterByCategory = (catId: number) => {
        const filteredProducts = products.filter(product =>
            product.categories.some(cat => cat.id === catId)
        )
        updateFiltered(filteredProducts)
    }
    const clearFilter = () => {
        updateFiltered(products)
    }

    return (
        <aside className={styles.container}>
            <div className={styles.filterContainer}>
                <ul>
                    {categories.map((cat, index) =>
                        <li key={cat.id}
                            onClick={() => filterByCategory(cat.id)}
                        >{cat.name.pt}</li>
                    )}
                </ul>
            </div>
            <div className={styles.filterContainer}>
                <h2>Filtrar por Coleção</h2>
                <ul>
                    {collections.map(col =>
                        <li key={col.id}
                            onClick={() => filterByCategory(col.id)}
                        >{col.name.pt}</li>
                    )}
                </ul>
            </div>
            <div className={styles.filterContainer}>
                <h2>Filtrar por Linha</h2>
                <ul>
                    {
                        lines.map(line =>
                            <li key={line.id}
                                onClick={() => filterByCategory(line.id)}
                            >{line.name.pt}</li>
                        )
                    }
                </ul>
            </div>
            <div className={styles.filterContainer}>
                <h2>Filtrar por preço.</h2>
                <div className={styles.inputContainer}>
                    <label htmlFor="from">
                        <p>De</p>
                        <input
                            type="text"
                            id='from'
                            value={fromPrice}
                            onChange={(e) => setFromPrice(e.target.value)}
                        />
                    </label>
                    <label htmlFor="to">
                        <p>Até</p>
                        <input
                            type="text"
                            id='to'
                            value={toPrice}
                            onChange={(e) => setToPrice(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className={styles.filterContainer}>
                <p onClick={clearFilter} className={styles.clearFilter}>Limpar Filtros</p>
            </div>
        </aside>
    )
}