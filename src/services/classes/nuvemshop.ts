import { Product, ProductList } from "@/@types/nuvemshop/products";
import axios, { AxiosError, AxiosInstance } from "axios";



class Nuvemshop {
    private token: string | undefined;
    private api: AxiosInstance

    constructor() {
        const token = process.env.ACCESS_TOKEN
        if (!token) console.error("Variável de ambiente ACCESS_TOKEN não configurada.")

        const url = process.env.BASE_URL;
        if (!url) console.error("Variável de ambiente BASE_URL não configurada.");
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
            console.error(`Erro ao buscar detalhes da loja: ${message}`);
            return { error: true, status, message };
        }
    }

    async getProducts() {
        try {
            const response = await this.api.get("/products");
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || error.message;
            console.error(`Erro ao buscar produtos: ${message}`);
            return { error: true, status, message };
        }
    }
    async produto(id: string) {
        //console.log("id dentro do metodo da classe produto", id)
        try {
            const response = await this.api.get(`/products/${id}`)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || error.message;
            console.error(`Erro ao buscar produto id ${id}: ${message}`);
            return { error: true, status, message };
        }
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