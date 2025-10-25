import { Category, ProductList } from "@/@types/nuvemshop/products"
import { debug } from "@/utils/DebugLogger"

export abstract class CategoryUtils {
    protected getAllCategories(products: ProductList): Category[] {
        if (!products || !Array.isArray(products)) {
            //debug.error("getAllCategories com products invalido", products)
            return []
        }
        //debug.log("Produtos no metodo getAllCategories", products)
        //const excluded = ["coleção"]
        const seen = new Set<string>()

        return products.flatMap(product => product.categories)
            .filter(category => {
                const name = category.name.pt.toLowerCase()
                if (seen.has(name)) return false
                seen.add(name)
                return true
            })
    }
    //precisa alterar a logica de acordo com o cadastro de categorias para identificação de linhas e coleções
    protected extractCollections(categories: Category[]): Category[] {
        const seen = new Set<string>()

        return categories.filter(category => {
            const name = category.name.pt.toLowerCase()
            if (!name.includes("coleção")) return false
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })
    }
    //precisa alterar a logica de acordo com o cadastro de categorias e identificacao das linhas e tal
    protected extractLines(categories: Category[]): Category[] {
        const seen = new Set<string>()

        return categories.filter(category => {
            const name = category.name.pt.toLowerCase()
            if (!name.includes("linha")) return false
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })
    }
}