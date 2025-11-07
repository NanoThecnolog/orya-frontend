import { RiInstagramFill } from 'react-icons/ri'
import styles from './styles.module.scss'
import { TbBrandWhatsappFilled } from 'react-icons/tb'
import { MdEmail } from 'react-icons/md'
import { LiaLongArrowAltRightSolid } from 'react-icons/lia'
import { useEffect, useState } from 'react'
import { Validator } from '@/services/classes/validator'
import axios from 'axios'
import { debug } from '@/utils/DebugLogger'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { oryaData } from '@/common/variables/oryaData'
import { format } from '@/utils/formatContent'

export default function Footer() {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    //const [name, setName] = useState<string>("")
    const cleanPhone = format.formatPhoneNumber(oryaData.phones[0].countryCode, oryaData.phones[0].areaCode, oryaData.phones[0].number).clean

    const links = [{
        name: "cuidados",
        link: "/cuidados-e-garantia"
    },
    {
        name: /*"guia de tamanhos"*/ "Política de Privacidade",
        link: "/privacy"
    },
    {
        name: "políticas de troca e devolução",
        link: "/troca-e-devolucao"
    },
    {
        name: "formas de pagamento",
        link: "/"
    },
    {
        name: "sobre",
        link: "/about"
    },
    {
        name: "faq",
        link: "/"
    },
    {
        name: "contato@orya.com",
        link: "/"
    },]

    const handleNewsLetter = async () => {
        if (!Validator.email(email)) return toast.error("Email inválido. Insira um email válido.")

        try {
            const response = await axios.post("/api/newsletter", {
                email,
                name: "Cliente Oryá"
            })
            const data = response.data
            debug.log("Cadastro newsletter", data)
            toast.success("Email cadastrado com sucesso.")
        } catch (err) {
            debug.error("Erro durante cadastro de newsletter no componente footer", err)
        }
    }
    const handleClick = (link: string) => {
        router.push(link)
    }
    return (
        <footer className={styles.container}>
            <div className={styles.linkContainer}>
                <ul>
                    {links.map(item =>
                        <li key={item.name} onClick={() => handleClick(item.link)}>
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>
            <div className={styles.iconContainer}>
                <div className={styles.inputContainer}>
                    <label htmlFor="">
                        <h4>Se inscreva na nossa newsletter:</h4>
                        <div className={styles.input}>
                            <input
                                type="text"
                                placeholder='EMAIL'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <LiaLongArrowAltRightSolid size={25} onClick={handleNewsLetter} />
                        </div>
                    </label>
                </div>
                <div className={styles.socialContainer}>
                    <a
                        href={`${oryaData.socialMedia[0].link}`}
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <RiInstagramFill size={33} />
                    </a>
                    <a
                        href={`https://api.whatsapp.com/send/?phone=${cleanPhone}&text=Ol%C3%A1%21+Gostaria+de+tirar+uma+d%C3%BAvida%21%21&type=phone_number&app_absent=0`}
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <TbBrandWhatsappFilled size={33} />
                    </a>
                    <a
                        href={`mailto:${oryaData.email}`}
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <MdEmail size={33} />
                    </a>
                </div>
            </div>
        </footer>
    )
}