import { Product } from '@/@types/nuvemshop/products'
import styles from './styles.module.scss'
import { format } from '@/utils/formatContent'
import ProductImages from '../ProductImages'
import { useState } from 'react'

interface InfoProps {
    info: Product
}

export default function ProductInfo({ info }: InfoProps) {
    const [amount, setAmount] = useState<number>(1)
    console.log(info.variants[0].inventory_levels)

    const changeAmount = (operation: boolean) => {
        if (operation) {

            setAmount(amount + 1)
        }
        else {
            if (amount <= 1) return
            setAmount(amount - 1)
        }
    }
    return (
        <section className={styles.container}>
            <div className={styles.productContainer}>
                <ProductImages images={info.images} />
                <div className={styles.infoContainer}>
                    <div className={styles.productInfo}>
                        <h2>{info.name.pt}</h2>
                        <p>{format.price(info.variants[0].price)}</p>
                        <p>{format.discount(info.variants[0].price, 10)}</p>
                    </div>
                    <div className={styles.quantityContainer}>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                className={styles.input}
                            />
                            <button
                                type='button'
                                className={styles.decres}
                                onClick={() => changeAmount(false)}
                            >
                                -
                            </button>
                            <button
                                type='button'
                                className={styles.acres}
                                onClick={() => changeAmount(true)}
                            >
                                +
                            </button>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type='button' className={styles.buyBtn}>Encomendar</button>
                        </div>
                    </div>
                    <div className={styles.paymentMethodsContainer}>
                        Meios de pagamento
                    </div>
                    <div className={styles.shippingContainer}>
                        Meios de envio
                    </div>
                    <div
                        className={styles.descriptionContainer}
                        dangerouslySetInnerHTML={{ __html: info.description.pt }}
                    />
                </div>
            </div>
            <div className={styles.takeCareContainer}>
                <h3>CUIDADOS E MANUTENÇÃO DAS JOIAS</h3>
                <section>
                    <h4>Recomendações Gerais</h4>
                    <ul>
                        <li>Evite usar suas joias ao nadar, tomar banho, praticar esportes ou lavar as mãos.</li>
                        <li>Não exponha a joia a cremes, perfumes, talcos, produtos de limpeza ou maquiagens.</li>
                        <li>Produtos abrasivos podem danificar as gemas naturais; não utilize.</li>
                        <li>Manuseie com cuidado: impactos contra superfícies duras podem danificar estruturas delicadas, não sendo esses casos cobertos pela garantia.</li>
                        <li>Guarde suas peças separadamente, em lugar seco e sem exposição ao sol, evitando o atrito entre pedras e metais.</li>
                        <li>Limpe sua joia com apenas uma flanela seca.</li>
                    </ul>
                    <p>
                        Nossa garantia é válida por seis meses a partir da data da compra. Não cobre, no entanto, danos pelo uso indevido da peça, acidentes, procedimentos de reparos externos ou reação com produtos químicos, mesmo que inerentes ao corpo do usuário.
                    </p>
                </section>

                <section>
                    <h4>Prata 950 com Banho de Ouro</h4>
                    <p>
                        Nossas joias em prata 950 recebem banho em ouro 18k. Para limpeza, utilize escova de cerdas macias e sabão neutro em água corrente. Se necessário, deixe de molho por alguns minutos e seque com papel macio. Caso precise, envie sua joia para o nosso atelier em São Paulo para avaliação.
                    </p>
                    <p>
                        <em>*Oferecemos serviços de polimento, limpeza e ajustes mediante apresentação do nosso certificado de garantia.</em>
                    </p>
                </section>

                <section>
                    <h4>Ouro 18K</h4>
                    <p>
                        Limpe sua joia com apenas flanela seca. Se necessário, utilize água morna e sabonete neutro, secando com pano macio. Caso precise de manutenção mais profunda, envie sua joia para o nosso atelier em São Paulo para avaliação.
                    </p>
                </section>

                <section>
                    <h4>Oxidação</h4>
                    <p>
                        A prata e o cobre presentes nas ligas de ouro podem oxidar em contato com o ar, alterando a cor da joia. Essa mudança é natural e não afeta a qualidade. A intensidade varia conforme fatores como proximidade do mar, pH da pele e forma de armazenamento.
                    </p>
                </section>

                <section>
                    <h4>NÃO ESTÃO COBERTOS PELA GARANTIA</h4>
                    <ul>
                        <li>Danos causados por mau uso.</li>
                        <li>Alterações por contato com produtos químicos.</li>
                    </ul>
                    <p>
                        Após o período de garantia, oferecemos serviços de reparo mediante orçamento prévio.
                    </p>
                </section>
            </div>
        </section>
    )
}