import Head from 'next/head'
import styles from './styles.module.scss'
import { oryaData } from '@/common/variables/oryaData'
import { format } from '@/utils/formatContent'
import { MdEmail } from 'react-icons/md'
import { FaPhoneAlt, FaRegCalendarAlt } from 'react-icons/fa'
import Faq from '@/components/FAQ'
import { faqData } from '@/common/variables/faq'

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
                    <p>Entre em contato conosco através dos nossos canais de atendimento</p>

                    <div className={styles.infoContainer}>
                        <div className={styles.info}>
                            <MdEmail size={35} />
                            <p>
                                <a href={`"mailto:${oryaData.email}`}>{oryaData.email}</a>
                            </p>
                        </div>
                        <div className={styles.info}>
                            <FaPhoneAlt size={35} />
                            <p>
                                <strong>Telefone{oryaData.phones.length > 1 && "s"}</strong>

                            </p>
                            {oryaData.phones.map((phone, index) => {
                                const formattedPhone = format.formatPhoneNumber(phone.countryCode, phone.areaCode, phone.number).formatted
                                const cleanPhone = format.formatPhoneNumber(phone.countryCode, phone.areaCode, phone.number).clean
                                return (
                                    <p key={index}><a href={`tel:${cleanPhone}`}>{formattedPhone}</a></p>
                                )
                            })}
                        </div>
                        <div className={styles.info}>
                            <FaRegCalendarAlt size={35} />
                            <p>
                                <strong>Atendimento</strong>
                            </p>
                            <p>Segunda à Sexta-feira, das 9h às 18h, exceto
                                feriados.</p>
                        </div>
                    </div>

                </section>
                <Faq data={faqData} />
            </main>
        </>
    )
}