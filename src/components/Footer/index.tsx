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

export default function Footer() {
    const [email, setEmail] = useState<string>("")
    //const [name, setName] = useState<string>("")

    useEffect(() => {

        //const name = email.split("@")[0]
        //setName(name)
    }, [email])

    const links = [
        "cuidados", "guia de tamanhos", "políticas de troca e devolução", "formas de pagamento", "sobre", "faq", "contato@orya.com"
    ]

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
                    <RiInstagramFill size={33} />
                    <TbBrandWhatsappFilled size={33} />
                    <MdEmail size={33} />
                </div>
            </div>
        </footer>
    )
}