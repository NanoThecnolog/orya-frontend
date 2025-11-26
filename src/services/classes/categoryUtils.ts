import { debug } from "@/utils/DebugLogger"
import { apiTray } from "./IntegraApi"
import { CategoryList } from "@/@types/categories"
import axios from "axios"
import { CategoryTreeResponse } from "@/@types/tray/categoryTreeResponse"

export abstract class CategoryUtils {


    protected async getCategoryTree(id: string): Promise<CategoryTreeResponse> {
        try {
            const tree = await axios.get<CategoryTreeResponse>('/api/category/tree', {
                params: { id }
            })
            return tree.data
        } catch (err) {
            console.log("Erro ao buscar árvore da categoria", err)
            throw new Error('Erro ao buscar árvore de categorias dentro de categoryUtils')
        }
    }
    protected async getAllCategories(): Promise<CategoryList[]> {

        try {
            const categories = await axios.get(`/api/categories`)
            return categories.data
        } catch (err) {
            console.log("Erro ao buscar todas as categorias dentro de categoryUtils", err)
            throw new Error('Erro ao buscar todas as categorias dentro de categoryUtils')
        }
    }
    //precisa alterar a logica de acordo com o cadastro de categorias para identificação de linhas e coleções
    protected extractCollections(categories: CategoryList[]): CategoryList[] {
        const seen = new Set<string>()

        return categories.filter(category => {
            const name = category.Category.name.toLowerCase()
            if (!name.includes("coleção")) return false
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })
    }
    //precisa alterar a logica de acordo com o cadastro de categorias e identificacao das linhas e tal
    protected extractLines(categories: CategoryList[]): CategoryList[] {
        const seen = new Set<string>()

        return categories.filter(category => {
            const name = category.Category.name.toLowerCase()
            if (!name.includes("linha")) return false
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })
    }

}