import { RiInstagramFill } from 'react-icons/ri'
import styles from './styles.module.scss'
import { TbBrandWhatsappFilled } from 'react-icons/tb'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
    const links = [
        "cuidados", "guia de tamanhos", "políticas de troca e devolução", "formas de pagamento", "sobre", "faq", "contato@orya.com"
    ]
    return (
        <footer className={styles.container}>
            <ul>
                {links.map(item =>
                    <li key={item}>
                        {item}
                    </li>
                )}
            </ul>
            <div className={styles.iconContainer}>
                <div>
                    <input type="text" placeholder='EMAIL' />
                </div>
                <div>
                    <RiInstagramFill />
                    <TbBrandWhatsappFilled />
                    <MdEmail />
                </div>
            </div>
        </footer>
    )
}