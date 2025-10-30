import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from "./styles.module.scss"

export function Breadcrumbs() {
    const pathname = usePathname()
    const parts = pathname?.split("/").filter(Boolean)

    const crumbs = parts?.map((part, index) => {
        const decoded = decodeURIComponent(part)
        const href = "/" + parts.slice(0, index + 1).join("/")
        const label = decoded.charAt(0).toUpperCase() + decoded.slice(1)
        return { href, label }
    })

    return (
        <nav aria-label="breadcrumb" className={styles.breadcrumb}>
            <ol>
                <li>
                    <Link href={"/"}>Início</Link>
                </li>
                {crumbs && crumbs.map((crumb, i) => (
                    <li key={i}>
                        <span className={styles.separator}>›</span>
                        <span>{crumb.label}</span>
                    </li>
                ))}
            </ol>
        </nav>
    )
}