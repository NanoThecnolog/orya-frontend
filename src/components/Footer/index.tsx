import { RiInstagramFill } from 'react-icons/ri'
import styles from './styles.module.scss'
import { TbBrandWhatsappFilled } from 'react-icons/tb'
import { MdEmail } from 'react-icons/md'
import { LiaLongArrowAltRightSolid } from 'react-icons/lia'

export default function Footer() {
    const links = [
        "cuidados", "guia de tamanhos", "políticas de troca e devolução", "formas de pagamento", "sobre", "faq", "contato@orya.com"
    ]
    return (
        <footer className={styles.container}>
            <div className={styles.linkContainer}>
                <ul>
                    {links.map(item =>
                        <li key={item}>
                            {item}
                        </li>
                    )}
                </ul>
            </div>
            <div className={styles.iconContainer}>
                <div className={styles.inputContainer}>
                    <label htmlFor="">
                        <h4>Se inscreva na nossa newsletter:</h4>
                        <input type="text" placeholder='EMAIL' />
                        <LiaLongArrowAltRightSolid />
                    </label>
                </div>
                <div className={styles.socialContainer}>
                    <RiInstagramFill size={33} />
                    <TbBrandWhatsappFilled size={33} />
                    <MdEmail size={33} />
                </div>
            </div>
        </footer>
    )
}