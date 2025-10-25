import { Category, ProductList } from "@/@types/nuvemshop/products";
import { CategoryUtils } from "./categoryUtils";

export class Filter extends CategoryUtils {
    private products: ProductList
    constructor(products: ProductList) {
        super()
        this.products = products
    }
    getCategories(): Category[] {
        const categories = this.getAllCategories(this.products)
        const seen = new Set<string>()

        return categories.filter(category => {
            const name = category.name.pt.toLowerCase()
            if (name.includes("coleção")) return false
            if (name.includes("linha")) return false
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })
    }
    getCollections(): Category[] {
        return this.extractCollections(this.getAllCategories(this.products))
    }
    getLines(): Category[] {
        return this.extractLines(this.getAllCategories(this.products))
    }
}

