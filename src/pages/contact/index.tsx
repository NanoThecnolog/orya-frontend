import Head from 'next/head'
import styles from './styles.module.scss'

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Pagina de contato | Oryá Atelier</title>
                <meta name='description' content='Página de contato da loja Oryá' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                Apresentamos a ORYÁ: joias que são uma extensão da personalidade, unindo sofisticação e singularidade. Cada peça foi criada para conectar a mulher contemporânea à sua essência, indo além do ordinário para se tornar uma forma de expressão pessoal.
                Inspirado nas raízes indígenas das fundadoras, o nome ORYÁ surge da união das palavras “Ouro” e “Ykerá” (irmã), representando a proximidade, a parceria e o vínculo profundo entre as irmãs Tainá e Raira Mioto.

                A ORYÁ cria joias que se tornam parte da história e da celebração única de cada mulher, refletindo sua essência e personalidade.
                FOTO DAS IRMÃS
            </main>
        </>
    )
}