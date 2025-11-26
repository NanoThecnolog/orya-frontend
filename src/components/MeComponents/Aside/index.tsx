import axios from 'axios'
import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { debug } from '@/utils/DebugLogger'

interface AsideProps {
    current: string
    setComponent: (a: string) => void
}
export default function Aside({ current, setComponent }: AsideProps) {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout')
            toast.success("logout realizado com sucesso.")
            router.push('/')
        } catch (err) {
            debug.log("Erro ao tentar fazer o login", err)
        }
    }
    return (
        <aside className={styles.container}>
            <nav>
                <ul>
                    <li className={current === 'a' ? styles.active : ''} onClick={() => setComponent('a')}>Meus Pedidos</li>
                    <li className={current === 'b' ? styles.active : ''} onClick={() => setComponent('b')}>Meus Dados</li>
                    <li onClick={handleLogout}>Sair</li>
                </ul>
            </nav>
        </aside>
    )
}