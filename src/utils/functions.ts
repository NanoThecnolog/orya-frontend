import { useRouter } from "next/navigation"
import { v4 as uuid } from "uuid"

export class Functions {
    constructor(private router: ReturnType<typeof useRouter>) {
    }
    pushProductPage = (shortcut: string) => {
        this.router.push(`/product/${shortcut}`)
    }
    pushCategoryPage = (name: string) => {
        this.router.push(`/categories/category/${name.toLowerCase()}`)
    }
    imagePath = (code: number) => {
        return `/img/ORYA ${code}.jpg`
    }
    static openWindow(url: string) {
        window.open(url, "_blank", "noopener,noreferrer")
    }
    static generateSessionID() {
        return uuid()
    }


}