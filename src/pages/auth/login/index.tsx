import Head from 'next/head'
import styles from './styles.module.scss'
import { FormEvent, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import { useMain } from '@/contexts/mainContext'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [seePass, setSeePass] = useState(false)
    const { signIn } = useMain()

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        await signIn({ email, password })
    }

    return (
        <>
            <Head>
                <title>Acesse sua conta | Orya Atelier</title>
                <meta name='description' content='Pagina de login da loja Orya Atelier' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <main className={styles.container}>
                <section className={styles.sectionContainer}>
                    <h2>Area do cliente</h2>
                    <form className={styles.formContainer} onSubmit={handleLogin}>
                        <label htmlFor="">
                            <h4>Email</h4>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label htmlFor="">
                            <div className={styles.passTitle}>
                                <h4>Senha</h4>
                                {
                                    seePass ? <FaEyeSlash onClick={() => setSeePass(!seePass)} /> : <FaEye onClick={() => setSeePass(!seePass)} />
                                }
                            </div>

                            <input
                                type={`${seePass ? "text" : "password"}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <div>
                            <Link href={'/auth/register'}>Primeiro Acesso?</Link>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type='submit'>Acessar</button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}