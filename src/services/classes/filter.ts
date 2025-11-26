import { CategoryProduct } from "@/@types/tray/products";
import { CategoryUtils } from "./categoryUtils";
import { debug } from "@/utils/DebugLogger";
import { Product } from "@/@types/tray/products";
import { CategoryList } from "@/@types/categories";
import { CategoryTreeResponse } from "@/@types/tray/categoryTreeResponse";

export class Filter extends CategoryUtils {
    private products: Product[]
    constructor(products: Product[]) {
        super()
        this.products = products
    }
    async getCategories(): Promise<CategoryList[]> {
        const categories = await this.getAllCategories()
        if (!categories) throw new Error("Erro no metodo getCategories em filter")
        const seen = new Set<string>()

        return categories.filter(category => {
            const name = category.Category.name.toLowerCase()
            if (name.includes("coleção")) return false
            if (name.includes("linha")) return false
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })
    }
    async getCollections(): Promise<CategoryList[]> {
        const categories = await this.getAllCategories()
        return this.extractCollections(categories)
    }
    async getLines(): Promise<CategoryList[]> {
        const categories = await this.getAllCategories()
        console.log(categories)
        return this.extractLines(categories)
    }
    async productsByCategory(name: string) {
        const categories = await this.getAllCategories()
        const category = categories.find(cat => cat.Category.name.toLowerCase() === name.toLowerCase())
        debug.log("categoria no metodo", category)

        return this.products.filter(product =>
            product.all_categories.some(cat =>
                cat.toLowerCase() === category?.Category.id.toLowerCase()
            ))
    }
    async productsByLine(name: string) {
        const lines = await this.getLines()
        const line = lines.find(l =>
            l.Category.name.toLowerCase().replace(/^linha\s*/i, '').trim() === name.toLowerCase())
        if (!line) return []
        debug.log("Linha no metodo productsByLine", line)
        debug.log("lista de produtos recebida no metodo", this.products)
        const products = this.products.filter(product =>
            product.all_categories.some(cat =>
                cat.toLowerCase() === line.Category.id.toLowerCase()
            )
        )
        debug.log("produtos retornados no metodo productsByLine", products)

        return products
    }

    async getTree(categoryID: string): Promise<CategoryTreeResponse> {
        const categoryTree = await this.getCategoryTree(categoryID)
        return categoryTree
    }
}

