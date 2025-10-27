import { useRouter } from "next/navigation"

export class Functions {
    constructor(private router: ReturnType<typeof useRouter>) {
    }
    pushProductPage = (id: number) => {
        this.router.push(`/product/${id}`)
    }
    pushCategoryPage = (name: string) => {
        this.router.push(`/categories/category/${name.toLowerCase()}`)
    }
}