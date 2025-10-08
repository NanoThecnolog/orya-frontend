import styles from './styles.module.scss'

export default function TextDivisor() {
    return (
        <>
            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2>Visite Nosso Ateliê</h2>
                    <p>Agende um horário pelo nosso whatsapp</p>
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