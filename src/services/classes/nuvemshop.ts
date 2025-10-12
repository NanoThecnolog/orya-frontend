import axios, { AxiosError, AxiosInstance } from "axios";

const token = process.env.ACCESS_TOKEN
//console.log(token)
if (!token) console.error("Variável de ambiente ACCESS_TOKEN não configurada.")

const url = process.env.BASE_URL;
if (!url) console.error("Variável de ambiente BASE_URL não configurada.");

class Nuvemshop {
    private token: string | undefined = token;
    private api: AxiosInstance

    constructor() {
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
}

export const nuvemshop = new Nuvemshop()