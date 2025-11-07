import Head from 'next/head'
import styles from './styles.module.scss'
import { oryaData } from '@/common/variables/oryaData'
import { format } from '@/utils/formatContent'

export default function ContactPage() {


    return (
        <>
            <Head>
                <title>Pagina de contato | Oryá Atelier</title>
                <meta name='description' content='Página de contato da loja Oryá' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <section className={styles.sectionContainer}>
                    <h2 className={styles.title}>CONTATO</h2>

                    <div className={styles.info}>
                        <p>
                            <strong>E-mail:</strong>{" "}
                            <a href={`"mailto:${oryaData.email}`}>{oryaData.email}</a>
                        </p>
                        <p>
                            <strong>Telefone:</strong>{" "}
                            {oryaData.phones.map((phone, index) => {
                                const formattedPhone = format.formatPhoneNumber(phone.countryCode, phone.areaCode, phone.number).formatted
                                const cleanPhone = format.formatPhoneNumber(phone.countryCode, phone.areaCode, phone.number).clean

                                return (
                                    <a key={index} href={`tel:${cleanPhone}`}>{formattedPhone}</a>
                                )
                            })}
                        </p>
                        <p>
                            <strong>Atendimento:</strong> segunda a sexta, das 9h às 18h, exceto
                            feriados.
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}