import { MenuProps } from "@/@types/Menu";
import { CategoryUtils } from "./categoryUtils";
import { Filter } from "./filter";
import { Product } from "@/@types/tray/products";

export class RenderMenu extends CategoryUtils {

    async menu(products: Product[]): Promise<MenuProps[]> {
        const filter = new Filter(products)
        const allCategories = await filter.getCategories()
        const collections = await filter.getCollections()
        const trees = await Promise.all(
            collections.map(async col => filter.getTree(col.Category.id)))

        //const lines = await filter.getLines()

        return [
            {
                title: "coleções",
                dropMenu: collections.map((col, index) => {
                    const collectionName = col.Category.name.toLowerCase().replace(/coleção\s*/i, '').trim()
                    const tree = trees[index]
                    const children = tree?.Category[0].Category.children || []
                    //const collectionLines = trees.filter(line => line.Category.parent_id === col.Category.id)


                    return {
                        title: collectionName,
                        id: col.Category.id,
                        link: `/collections/${collectionName}`,
                        children: children.map(child => {
                            const line = child.Category
                            const lineName = line.name.toLowerCase().replace(/linha\s*/i, '').trim()

                            return {
                                title: line.name,
                                id: line.id,
                                link: `/line/${lineName}`
                            }

                        })
                    }
                })
            },
            {
                title: "categorias",
                dropMenu: allCategories.map(cat => ({
                    title: cat.Category.name,
                    id: cat.Category.id,
                    link: `/categories/category/${cat.Category.name.toLowerCase().replace(/coleção\s*/i, '').trim()}`
                }))
            },
            {
                title: "produtos",
                link: "/products"

            },
            {
                title: "contato",
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