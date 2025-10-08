import Image from 'next/image'
import styles from './styles.module.scss'
import { CiSearch, CiUser } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'
import { IoBagOutline } from 'react-icons/io5'

export default function Header() {
    const menu = [
        "coleções", "categorias", "linhas", "onde encontrar", "sobre"
    ]
    return (
        <nav className={styles.container}>
            <div className={styles.logoContainer}>
                <Image
                    src="/logo/SEM FUNDO/ORYÁ_LOGO SF_V1_2.png"
                    alt="logo"
                    fill
                    priority={false}
                    className={styles.image}
                />
            </div>
            <ul className={styles.menu}>
                {menu.map(item =>
                    <li key={item}>{item} <IoIosArrowDown /></li>
                )}
            </ul>

            <div className={styles.iconContainer}>
                <div className={styles.link}><span>port</span> <IoIosArrowDown /></div>
                <div className={styles.icons}>
                    <CiSearch size={20} />
                    <CiUser size={20} />
                    <IoBagOutline size={19} />
                </div>
            </div>
        </nav>
    )
}