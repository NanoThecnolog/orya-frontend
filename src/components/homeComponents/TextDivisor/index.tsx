import styles from './styles.module.scss'

export default function TextDivisor() {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2>Envio para todo Brasil</h2>
                    <p>Receba suas encomendas no conforto da sua casa</p>
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.color}>Peças Sob Encomenda</h2>
                    <p>Feito sob medida para você</p>
                </div>
            </section>
            <div className={styles.divisor}></div>
        </>
    )
}