import { MenuProps } from "@/@types/Menu";
import { Nuvemshop } from "./nuvemshop";
import { Category, ProductList } from "@/@types/nuvemshop/products";
import { debug } from "@/utils/DebugLogger";

class RenderMenu extends Nuvemshop {
    private getAllCategories(products: ProductList): Category[] {
        if (!products || !Array.isArray(products)) {
            //debug.error("getAllCategories com products invalido", products)
            return []
        }
        debug.log("Produtos no metodo getAllCategories", products)
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
    private extractCollections(categories: Category[]): Category[] {
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
    private extractLines(categories: Category[]): Category[] {
        //debug.log("collections", categories)
        const seen = new Set<string>()

        return categories.filter(category => {
            const name = category.name.pt.toLowerCase()
            if (!name.includes("linha")) return false
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })
    }

    menu(products: ProductList): MenuProps[] {
        const allCategories = this.getAllCategories(products)
        const collections = this.extractCollections(allCategories)
        const lines = this.extractLines(collections)

        return [
            {
                title: "coleções",
                dropMenu: collections.map(col => ({
                    title: col.name.pt,
                    link: `/collections/${col.name.pt.toLowerCase().replace(/coleção\s*/i, '').trim()}`
                }))
            },
            {
                title: "categorias",
                dropMenu: allCategories.map(cat => ({
                    title: cat.name.pt,
                    link: `/categories/category/${cat.name.pt.toLowerCase().replace(/coleção\s*/i, '').trim()}`
                }))
            },
            {
                title: "linhas",
                dropMenu: lines.map(line => ({
                    title: line.name.pt,
                    link: `/line/${line.name.pt.toLowerCase().replace(/linha\s*/i, '').trim()}`
                }))
            },
            {
                title: "onde encontrar",
                link: "/contact",
            },
            {
                title: "sobre",
                link: "/about",
            },
        ]

    }
}

export const renderMenu = new RenderMenu()