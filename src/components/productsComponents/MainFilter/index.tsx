import { ProductList } from '@/@types/tray/products'
import styles from './styles.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Filter } from '@/services/classes/filter'
import { IoFilter } from 'react-icons/io5'
import { CategoryList } from '@/@types/categories'

interface CompProps {
    products: ProductList,
    updateFiltered: Dispatch<SetStateAction<ProductList>>
}


export default function MainFilter({ products, updateFiltered }: CompProps) {
    const [fromPrice, setFromPrice] = useState<string>("")
    const [toPrice, setToPrice] = useState<string>("")
    const [categories, setCategories] = useState<CategoryList[]>([])
    const [collections, setCollections] = useState<CategoryList[]>([])
    const [lines, setLines] = useState<CategoryList[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const setStates = async () => {
            const filter = new Filter(products)

            const categories = await filter.getCategories()
            setCategories(categories)

            const collections = await filter.getCollections()
            setCollections(collections)

            const lines = await filter.getLines()
            setLines(lines)
        }
        if (products && products.length > 0) setStates()
    }, [products])

    const filterByCategory = (catId: number) => {
        const filteredProducts = products.filter(product =>
            product.all_categories.some(cat => parseFloat(cat) === catId)
        )
        updateFiltered(filteredProducts)
    }
    const filterByPrice = (min: number, max: number) => {
        const filteredProducts = products.filter(product => {
            const price = parseFloat(product.price ?? "0")
            return price >= min && price <= max
        })
        updateFiltered(filteredProducts)
    }
    const clearFilter = () => {
        setFromPrice("")
        setToPrice("")
        updateFiltered(products)
    }
    useEffect(() => {
        const min = parseFloat(fromPrice ?? "0")
        const max = parseFloat(toPrice ?? "0")
        if (min > 0 && max > 0) {
            filterByPrice(min, max)
        }
    }, [fromPrice, toPrice])

    return (
        <aside className={styles.container}>
            <div className={styles.hamburguer} onClick={() => setOpen(!open)}>
                {open ? "Fechar filtro" : "Filtrar"} <IoFilter size={20} />
            </div>
            <div className={`${styles.filter} ${open && styles.open}`}>
                <div className={styles.filterContainer}>
                    <h2>Por Categoria</h2>
                    <ul>
                        {categories.map((cat) =>
                            <li key={cat.Category.id}
                                onClick={() => filterByCategory(parseFloat(cat.Category.id))}
                            >{cat.Category.name}</li>
                        )}
                    </ul>
                </div>
                <div className={styles.filterContainer}>
                    <h2>Por Coleção</h2>
                    <ul>
                        {collections.map(col =>
                            <li key={col.Category.id}
                                onClick={() => filterByCategory(parseFloat(col.Category.id))}
                            >{col.Category.name}</li>
                        )}
                    </ul>
                </div>
                <div className={styles.filterContainer}>
                    <h2>Por Linha</h2>
                    <ul>
                        {
                            lines.map(line =>
                                <li key={line.Category.id}
                                    onClick={() => filterByCategory(parseFloat(line.Category.id))}
                                >{line.Category.name}</li>
                            )
                        }
                    </ul>
                </div>
                <div className={styles.filterContainer}>
                    <h2>Por preço</h2>
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
            </div>
        </aside>
    )
}