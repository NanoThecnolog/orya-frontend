import Image from 'next/image'
import styles from './styles.module.scss'
import { CiSearch, CiUser } from 'react-icons/ci'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { IoBagOutline } from 'react-icons/io5'
import { useState } from 'react'
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { useMain } from '@/contexts/mainContext'
import { LiaLongArrowAltRightSolid } from 'react-icons/lia'
import { motion, AnimatePresence } from 'framer-motion'
import { Functions } from '@/utils/functions'

interface HeaderProps {
    useWine: boolean
}
export default function Header({ useWine }: HeaderProps) {
    const router = useRouter()
    const { menu, cartItems, productList, setCartOpen } = useMain()

    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [activeSub, setActiveSub] = useState<string | null>(null)

    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const [openSearch, setOpenSearch] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string>("")

    //console.log(menu)

    const logoSRC = useWine ?
        "/logo/sem-fundo/ORYA_LOGO_SF_V1_2.png" :
        "/logo/sem-fundo/ORYA_LOGO_SF_V1_1.png"

    const handleDropdown = (item: string) => {
        setActiveMenu(activeMenu === item ? null : item)
    }
    const handleClick = (link: string) => {
        router.push(link)
    }

    return (
        <nav className={styles.container} style={useWine ? {} : { backgroundColor: "beige" }}>
            <div className={styles.logoContainer} onClick={() => router.push("/")}>
                <Image
                    src={logoSRC}
                    alt="logo"
                    fill
                    priority={false}
                    className={styles.image}
                />
            </div>

            <div
                className={styles.hamburger}
                style={{ color: useWine ? "white" : "var(--wine)" }}
            >
                <div>
                    <CiUser size={20} onClick={() => Functions.openWindow('https://checkout.oryaatelier.com/my-account')} />
                </div>
                <div className={styles.cartIcon} onClick={() => { setCartOpen(true), setMobileOpen(false) }}>
                    <IoBagOutline size={19} />
                    {cartItems.length > 0 &&
                        <span className={styles.cartCount}>{cartItems.length}</span>
                    }
                </div>
                <div onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <RxCross2 size={25} /> : <RxHamburgerMenu size={25} />}
                </div>
            </div>
            <ul
                className={`${styles.menu} ${mobileOpen ? styles.open : ""}`}
                style={useWine ? {} : { backgroundColor: "beige" }}
            >
                {menu.length > 0 && menu.map(item =>
                    <li
                        key={item.title}
                        onClick={() => {
                            if (item.link) handleClick(item.link)
                            else handleDropdown(item.title)
                        }}
                        onMouseEnter={() => {
                            if (!item.link) setActiveMenu(item.title)
                        }}
                        onMouseLeave={() => {
                            if (!item.link) setActiveMenu(null)
                        }}
                        style={useWine ? { color: "white" } : { color: "var(--wine)" }}
                    >
                        <div className={styles.listItem}>
                            {item.title}
                            {!item.link && <IoIosArrowDown />}
                        </div>
                        <AnimatePresence>
                            {activeMenu === item.title && !item.link && (
                                <motion.ul
                                    key={"dropdown"}
                                    initial={{ opacity: 0, y: -10, maxHeight: 100 }}
                                    animate={{ opacity: 1, y: 0, maxHeight: 500 }}
                                    exit={{ opacity: 0, y: -10, maxHeight: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className={`${styles.dropdown} ${styles.active}`}
                                    style={useWine
                                        ? { borderTop: '1px solid rgba(204, 204, 204, 0.15)', borderBottom: '1px solid rgba(204, 204, 204, 0.15)' }
                                        : { backgroundColor: "beige", borderTop: '.5px solid var(--wine)', borderBottom: '.5px solid var(--wine)' }}
                                >
                                    {item.dropMenu?.map(drop =>
                                        <li
                                            key={drop.title}
                                            className={`${styles.dropItemContainer} ${activeSub === drop.title ? styles.active : ""}`}
                                            style={useWine ? { color: "white" } : { color: "var(--wine)" }}
                                            onClick={() => {
                                                if (!drop.children) handleClick(drop.link!)
                                            }}
                                            onMouseEnter={() => {
                                                if (drop.children) setActiveSub(drop.title)
                                            }}
                                            onMouseLeave={() => {
                                                if (drop.children) setActiveSub(null)
                                            }}
                                        >
                                            <div
                                                className={styles.dropItemTitle}

                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleClick(drop.link!)
                                                }}

                                            >
                                                {drop.title}
                                                {drop.children && drop.children.length > 0 && <IoIosArrowForward />}
                                            </div>
                                            <AnimatePresence>
                                                {activeSub === drop.title && drop.children &&
                                                    <motion.div
                                                        key={"submenu"}
                                                        initial={{ opacity: 0, x: 0, maxHeight: 0 }}
                                                        animate={{ opacity: 1, x: 0, maxHeight: 600 }}
                                                        exit={{ opacity: 0, x: 0, maxHeight: 0 }}
                                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                                        className={`${styles.submenu}`}
                                                    /*style={useWine
                                                        ? { borderTop: '1px solid rgba(204, 204, 204, 0.15)', borderBottom: '1px solid rgba(204, 204, 204, 0.15)' }
                                                        : { backgroundColor: "beige", borderTop: '.5px solid var(--wine)', borderBottom: '.5px solid var(--wine)' }}*/
                                                    >
                                                        {
                                                            drop.children.map(child =>
                                                                <li
                                                                    key={child.title}
                                                                    className={styles.submenuItem}
                                                                    style={useWine ? { color: "white" } : { color: "var(--wine)" }}
                                                                    onClick={() => handleClick(child.link!)}
                                                                >
                                                                    <div className={styles.submenuTitle}>
                                                                        {child.title}
                                                                    </div>
                                                                </li>
                                                            )
                                                        }
                                                    </motion.div>
                                                }
                                            </AnimatePresence>

                                        </li>
                                    )}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </li>
                )}
            </ul>

            <div className={styles.iconContainer} style={{ color: useWine ? "white" : "var(--wine)" }}>
                <div className={`${styles.searchInput} ${openSearch ? styles.open : ""}`}>
                    <input
                        type="text"
                        placeholder="Buscar produto"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <LiaLongArrowAltRightSolid size={25} />
                </div>
                <div className={styles.icons}>
                    <CiSearch size={20} onClick={() => setOpenSearch(!openSearch)} />
                    <CiUser size={20} onClick={() => Functions.openWindow('https://checkout.oryaatelier.com/my-account')} />

                    <div className={styles.cartIcon} onClick={() => { setCartOpen(true) }}>
                        <IoBagOutline size={19} />
                        {cartItems.length > 0 &&
                            <span className={styles.cartCount}>{cartItems.length}</span>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}