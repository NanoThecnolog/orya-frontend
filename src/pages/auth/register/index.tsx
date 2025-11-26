import Head from 'next/head'
import styles from './styles.module.scss'
import { FormEvent, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import { useMain } from '@/contexts/mainContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { CustomersListResponse } from '@/@types/tray/getCustomersResponse'
import { debug } from '@/utils/DebugLogger'
import { Validator } from '@/services/classes/validator'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPass, setVerifyPass] = useState('')
    const [seePass, setSeePass] = useState(false)
    const { signUp } = useMain()


    const handleCreateAccess = async (e: FormEvent) => {
        e.preventDefault()

        if (password !== verifyPass) {
            toast.warning("As senhas não são idênticas.")
            return
        }
        const passValidator = Validator.validatePassword(password)
        if (!passValidator.valid) {
            toast.error(passValidator.message);
            return null;
        }
        const emailValidator = Validator.email(email)
        if (!emailValidator) {
            toast.error("Email inválido. Tente novamente ou entre em contato conosco.")
            return null
        }
        const newUserData = {
            email,
            cpf,
            password
        }
        await signUp(newUserData)
    }

    return (
        <>
            <Head>
                <title>Crie sua conta | Orya Atelier</title>
                <meta name='description' content='Pagina de registro da Orya Atelier' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <section className={styles.sectionContainer}>
                    <h2>Crie seu acesso</h2>
                    <form className={styles.formContainer} onSubmit={handleCreateAccess}>
                        <label htmlFor="">
                            <h4>Email do comprador</h4>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label htmlFor="">
                            <h4>CPF do comprador</h4>
                            <input
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </label>
                        <label htmlFor="">
                            <div className={styles.passTitle}>
                                <h4>Senha</h4>
                                {
                                    seePass ? <FaEyeSlash onClick={() => setSeePass(!seePass)} /> : <FaEye onClick={() => setSeePass(!seePass)} />
                                }
                                <div>
                                    <p>A senha deve possuir ao menos:</p>
                                    <ul>
                                        <li>1 letra Maiúscula</li>
                                        <li>1 letra Minúscula</li>
                                        <li>1 Caractere especial</li>
                                        <li>1 Número</li>
                                    </ul>
                                </div>
                            </div>

                            <input
                                type={`${seePass ? "text" : "password"}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label htmlFor="">
                            <div className={styles.passTitle}>
                                <h4>Confirme sua senha</h4>
                                {
                                    seePass ? <FaEyeSlash onClick={() => setSeePass(!seePass)} /> : <FaEye onClick={() => setSeePass(!seePass)} />
                                }
                            </div>

                            <input
                                type={`${seePass ? "text" : "password"}`}
                                value={verifyPass}
                                onChange={(e) => setVerifyPass(e.target.value)}
                            />
                        </label>
                        <div className={styles.buttonContainer}>
                            <button type='submit'>Criar acesso</button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}