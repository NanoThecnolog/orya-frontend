import Image from 'next/image'
import styles from './styles.module.scss'
import { CiSearch, CiUser } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'
import { IoBagOutline } from 'react-icons/io5'
import { useState } from 'react'
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
import { menu } from '@/common/variables/menu'

interface HeaderProps {
    useWine: boolean
}
export default function Header({ useWine }: HeaderProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const logoSRC = useWine ? "/logo/SEM FUNDO/ORYÁ_LOGO SF_V1_1.png" : "/logo/SEM FUNDO/ORYÁ_LOGO SF_V1_2.png"

    const handleDropdown = (item: string) => {
        setActiveMenu(activeMenu === item ? null : item)
    }
    return (
        <nav className={styles.container}>
            <div className={styles.logoContainer}>
                <Image
                    src={logoSRC}
                    alt="logo"
                    fill
                    priority={false}
                    className={styles.image}
                />
            </div>
            <div className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <RxCross2 size={25} /> : <RxHamburgerMenu size={25} />}
            </div>

            <ul className={`${styles.menu} ${mobileOpen ? styles.open : ""}`}>
                {menu.map(item =>
                    <li
                        key={item.title}
                        onClick={() => handleDropdown(item.title)}
                        style={{ color: useWine ? "var(--wine)" : "white" }}
                    >
                        {item.title}
                        {!item.link && <IoIosArrowDown />}
                        {activeMenu === item.title && !item.link && (
                            <ul className={`${styles.dropdown} ${styles.active}`}>
                                {item.dropMenu?.map(drop =>
                                    <li
                                        key={drop.title}
                                        className={styles.dropItem}
                                    >
                                        {drop.title}
                                    </li>
                                )}
                            </ul>
                        )}
                    </li>
                )}
            </ul>

            <div className={styles.iconContainer}>
                <div className={styles.link}>
                    <span>port</span>
                    <IoIosArrowDown />
                </div>
                <div className={styles.icons}>
                    <CiSearch size={20} />
                    <CiUser size={20} />
                    <IoBagOutline size={19} />
                </div>
            </div>
        </nav>
    )
}