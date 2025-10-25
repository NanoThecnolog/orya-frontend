import { MenuProps } from "@/@types/Menu";
import { ProductList } from "@/@types/nuvemshop/products";
import { CategoryUtils } from "./categoryUtils";
import { Filter } from "./filter";

export class RenderMenu extends CategoryUtils {
    menu(products: ProductList): MenuProps[] {
        const filter = new Filter(products)
        const allCategories = filter.getCategories()
        const collections = filter.getCollections()
        const lines = filter.getLines()

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