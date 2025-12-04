import Head from 'next/head'
import styles from './styles.module.scss'

export default function ReturnExchangePage() {
    return (
        <>
            <Head>
                <title>Política de Troca e Devolução | Orya Atelier</title>
                <meta name='description' content='Informações sobre troca e devolução da Oryá, com orientações práticas para substituições ou retornos de produtos. Processo simples, transparência e suporte dedicado para garantir uma experiência segura e satisfatória.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <section className={styles.sectionContainer}>
                    <h2 className={styles.title}>POLÍTICAS DE TROCA E DEVOLUÇÃO</h2>

                    <p className={styles.text}>
                        Trocas ou devoluções podem ser solicitadas em até 7 dias corridos após o
                        recebimento da joia. A manifestação deve ser formalizada dentro desse
                        prazo por nossos canais oficiais de atendimento (
                        <a href="mailto:contato@oryaatelier.com">contato@oryaatelier.com</a>).
                    </p>

                    <p className={styles.text}>
                        O produto deve ser devolvido em perfeitas condições, com embalagem
                        original, nota fiscal e certificado, sem marcas de uso, sem
                        intervenções, sem riscos, amassados, resíduos químicos ou danos de
                        qualquer natureza. O não atendimento a esses requisitos descaracteriza a
                        integridade do produto e autoriza a recusa da solicitação, conforme boa
                        fé objetiva e art. 4º, III do CDC.
                    </p>

                    <p className={styles.text}>
                        Peças personalizadas não podem ser trocadas ou devolvidas após aprovação
                        do pedido.
                    </p>

                    <p className={styles.text}>
                        Trocas são realizadas apenas por peças disponíveis em estoque, de mesmo
                        valor ou com diferença a ser complementada.
                    </p>

                    <div className={styles.devolucao}>
                        <p className={styles.subtitle}>Em caso de devolução de valores:</p>
                        <ul className={styles.list}>
                            <li>
                                Compras por <strong>boleto ou depósito</strong> → reembolso em até 10
                                dias úteis, após aprovação da análise, para a mesma titularidade.
                            </li>
                            <li>
                                Compras por <strong>cartão de crédito</strong> → estorno conforme
                                prazo da operadora.
                            </li>
                        </ul>
                        <p className={styles.text}>
                            Não realizamos trocas ou devoluções de compras internacionais.
                        </p>
                    </div>

                    <div className={styles.observacoes}>
                        <h3 className={styles.subtitle}>OBSERVAÇÕES IMPORTANTES</h3>
                        <ul className={styles.list}>
                            <li>
                                Reservamo-nos o direito de não cancelar compras de produtos que
                                apresentem indícios de uso.
                            </li>
                            <li>
                                Se o produto devolvido não atender aos critérios de troca ou
                                devolução, poderá ser reenviado ao cliente com a justificativa.
                            </li>
                            <li>
                                Lojas físicas e pontos de venda não estão autorizados a receber
                                devoluções de produtos adquiridos online.
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </>
    )
}