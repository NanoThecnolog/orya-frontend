import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from "./styles.module.scss"

export function Breadcrumbs() {
    const pathname = usePathname()
    const parts = pathname.split("/").filter(Boolean)

    const crumbs = parts.map((part, index) => {
        const href = "/" + parts.slice(0, index + 1).join("/")
        const label = part.charAt(0).toUpperCase() + part.slice(1)
        return { href, label }
    })

    return (
        <nav aria-label="breadcrumb" className={styles.breadcrumb}>
            <ol>
                <li>
                    <Link href="/">Início</Link>
                </li>
                {crumbs.map((crumb, i) => (
                    <li key={i}>
                        <span className={styles.separator}>›</span>
                        <Link href={crumb.href}>{crumb.label}</Link>
                    </li>
                ))}
            </ol>
        </nav>
    )
}