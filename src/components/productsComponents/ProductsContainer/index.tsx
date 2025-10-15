import styles from './styles.module.scss'

export default function ProductsContainer() {
    return (
        <section className={styles.container}>
            <aside> filtro de produtos</aside>
            <div>
                produtos
            </div>
        </section>
    )
}