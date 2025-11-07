import Head from 'next/head'
import styles from './styles.module.scss'
import { oryaData } from '@/common/variables/oryaData'
import { format } from '@/utils/formatContent'

export default function PrivacyPage() {
    return (
        <>
            <Head>
                <title>Políticas de Troca e Devolução</title>
                <meta name='description' content='Página de políticas e troca de devolução' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <section className={styles.sectionContainer}>
                    <div className={styles.title}>
                        <h2>Política de Privacidade</h2>
                    </div>
                    <p className={styles.text}>
                        Todas as informações pessoais coletadas serão usadas exclusivamente para
                        facilitar a sua experiência em nosso site. As informações podem incluir
                        nome, e-mail, telefone, celular e endereço. A <strong>ORYA JOIAS LTDA</strong> se
                        preocupa com a segurança e privacidade dos dados e não compartilha,
                        aluga, vende ou empresta qualquer informação pessoal de seus clientes a
                        terceiros.
                    </p>

                    <p className={styles.text}>
                        Ao navegar em nosso site, o usuário concorda com os{" "}
                        <strong>Termos de Uso</strong> e as <strong>Políticas de Troca e Privacidade</strong>.
                        Os dados fornecidos são utilizados apenas para contatos referentes às
                        compras realizadas. Enviamos comunicações sobre promoções e novidades,
                        mas você pode optar por não recebê-las.
                    </p>

                    <p className={styles.text}>
                        O CPF é solicitado exclusivamente para emissão de notas fiscais e envio
                        de mercadorias. As senhas são armazenadas de forma criptografada. Os
                        dados de cartões de crédito são registrados diretamente pelas
                        administradoras, sem acesso por parte da <strong>ORYA JOIAS LTDA</strong>. A
                        responsabilidade pela autorização da transação é da operadora do cartão.
                    </p>

                    <p className={styles.text}>
                        A veracidade das informações prestadas no site é de responsabilidade
                        exclusiva do cliente.
                    </p>

                    <div className={styles.contato}>
                        <p>
                            Para dúvidas: <a href={`mailto: ${oryaData.email}`}>{oryaData.email}</a> ou{" "}
                            {oryaData.phones.map((phone, index) => {
                                const formattedPhone = format.formatPhoneNumber(phone.countryCode, phone.areaCode, phone.number).formatted
                                const cleanPhone = format.formatPhoneNumber(phone.countryCode, phone.areaCode, phone.number).clean

                                return (
                                    <a key={index} href={`tel:${cleanPhone}`}>{formattedPhone}</a>
                                )
                            })}
                        </p>
                        <p>Horário de atendimento: segunda a sexta, das 9h às 18h, exceto feriados.</p>
                    </div>

                    <div className={styles.empresa}>
                        <p><strong>Razão Social:</strong> ORYA JOIAS LTDA</p>
                        <p><strong>CNPJ:</strong> 59.241.433/0001-81</p>
                        <p><strong>Atendimento:</strong> +55 (11) 99710-5377</p>
                    </div>
                </section>
            </main>
        </>
    )
}