import Head from 'next/head'
import styles from './styles.module.scss'
import { notCoveredItems, recomendations } from '@/common/variables/warranties'

export default function CareAndWarrantyPage() {

    return (
        <>
            <Head>
                <title>Cuidados e Garantia | Oryá Atelier</title>
                <meta name='description' content='Página de cuidados da Oryá Atelier' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <section className={styles.sectionContainer}>
                    <div className={styles.title}>
                        <h1>CUIDADOS E TERMO DE GARANTIA</h1>
                    </div>
                    <div className={styles.garantiaContainer}>
                        <div className={styles.cover}>
                            <h2>TERMO DE GARANTIA</h2>
                            <p>A Oryá Atelier garante a autenticidade e a alta qualidade dos materiais utilizados em suas joias, produzidas em ouro 18 quilates, prata 950 e gemas naturais, sempre de acordo com padrões internacionais.</p>
                        </div>
                        <div className={styles.warnings}>
                            <p>
                                Nossa garantia é válida por seis meses a partir da data da compra. Não cobre, no entanto, danos pelo uso indevido da peça, acidentes, procedimentos de reparos externos, reação com produtos químicos mesmo que inerentes ao corpo do usuário.
                            </p>
                            <p>
                                Após o período de garantia, oferecemos serviços de reparo mediante orçamento prévio.
                            </p>
                        </div>
                        <div className={styles.notCover}>
                            <h3>NÃO ESTÃO COBERTOS PELA GARANTIA</h3>
                            <ul>
                                {
                                    notCoveredItems.map((item, i) =>
                                        <li key={i}>{item}</li>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                    <div className={styles.takecare}>
                        <h2>CUIDADOS E MANUTENÇÃO DAS JOIAS</h2>

                        <div className={styles.recomendations}>
                            <h4>Recomendações Gerais</h4>
                            <ul>
                                {recomendations.map((rec, i) =>
                                    <li key={i}>{rec}</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles.silverTakecare}>
                            <h4>Prata 950 com Banho de Ouro</h4>
                            <p>
                                Nossas joias em prata 950 recebem banho em ouro 18k.
                                Para limpeza, utilize escova de cerdas macias e sabão neutro em água corrente. Se necessário, deixe de molho por alguns minutos e seque com papel macio. Caso precise, envie sua joia para o nosso atelier em São Paulo para avaliação.
                            </p>
                            <p>*Oferecemos serviços de polimento, limpeza e ajustes mediante apresentação do nosso certificado de garantia.</p>
                        </div>

                        <div className={styles.goldenTakecare}>
                            <h4>Ouro 18K</h4>
                            Limpe sua joia com apenas com flanela seca. Se necessário, utilize água morna e sabonete neutro, secando com pano macio.
                            Caso precise de manutenção mais profunda, envie sua joia para o nosso atelier em São Paulo, para fazermos uma avaliação.
                        </div>

                        <div className={styles.aboutOxidation}>
                            <h4>Oxidação</h4>
                            A prata e o cobre presentes nas ligas de ouro podem oxidar em contato com o ar, alterando a cor da joia.
                            Essa mudança é natural e não afeta a qualidade. A intensidade varia conforme fatores como proximidade do mar, pH da pele e forma de armazenamento.
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}