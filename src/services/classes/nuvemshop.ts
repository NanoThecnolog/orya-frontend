import { Product, ProductList } from "@/@types/nuvemshop/products";
import { debug } from "@/utils/DebugLogger";
import axios, { AxiosError, AxiosInstance } from "axios";



export class Nuvemshop {
    private token: string | undefined;
    private api: AxiosInstance

    constructor() {
        const token = process.env.ACCESS_TOKEN
        if (!token) debug.error("Variável de ambiente ACCESS_TOKEN não configurada.")

        const url = process.env.BASE_URL;
        if (!url) debug.error("Variável de ambiente BASE_URL não configurada.");
        this.token = token || ""
        this.api = axios.create({
            baseURL: url,
            headers: {
                Authentication: this.token ? `bearer ${this.token}` : "",
                "User-Agent": "loja-orya (contato@ericssongomes.com)",
            },
        })
    }

    async getStoreData() {
        try {
            const response = await this.api.get("/store")
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao buscar detalhes da loja: ${message}`);
            return { error: true, status, message };
        }
    }

    async getProducts(): Promise<ProductList> {
        try {
            const response = await this.api.get("/products");
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao buscar produtos: status ${status}, message ${message}`);
            return [];
        }
    }
    async produto(id: string): Promise<Product | null> {
        //console.log("id dentro do metodo da classe produto", id)
        try {
            const response = await this.api.get(`/products/${id}`)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao buscar produto id ${id}: ${message}`, err);
            return null
        }
    }
    getProductsByCollection(products: ProductList, collection: string): Product[] {
        if (!Array.isArray(products)) {
            debug.error('Erro: "products" deve ser um array.')
            return []
        }
        const productByCollection = products.filter((product: Product) => {
            if (typeof product !== 'object' || product === null || !Array.isArray(product.categories)) {
                debug.warn("Produto ignorado por estrutura invalida: ", product)
                return false
            }
            return product.categories.some(cat =>
                cat &&
                typeof cat.name === 'object' &&
                typeof cat.name.pt === 'string' &&
                cat.name.pt.toLowerCase().includes(collection.toLowerCase()))
        }
        )
        return productByCollection
    }

    relatedProductsByCategory(product: Product, products: ProductList): Product[] {
        const related = products.filter(item =>
            item.id !== product.id &&
            item.categories.some(category =>
                product.categories.some(categ =>
                    category.name.pt.toLowerCase() === categ.name.pt.toLowerCase())
            ))
        return related
    }
}

export const nuvemshop = new Nuvemshop()