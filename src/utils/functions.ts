import { useRouter } from "next/navigation"

export class Functions {
    constructor(private router: ReturnType<typeof useRouter>) {
    }
    pushProductPage = (id: number) => {
        this.router.push(`/product/${id}`)
    }
}