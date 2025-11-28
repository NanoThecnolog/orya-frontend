import { Product, ProductList, ProductListResponse } from "@/@types/tray/products";
import { NewsLetterProps, NewsLetterResponse } from "@/@types/tray/newsletter";
import { debug } from "@/utils/DebugLogger";
import axios, { AxiosError, AxiosInstance } from "axios";
import { CategoryList } from "@/@types/categories";
import { ProductDetails } from "@/@types/tray/ProductDetails";
import { CreateLoginProps, LoginResponseInterface, UserLoginProps } from "@/@types/tray/loginProps";
import { CreateUserResponse } from "@/@types/tray/createUserResponse";
import { CustomersListResponse } from "@/@types/tray/getCustomersResponse";
import { OrderWrap } from "@/@types/tray/Orders";
import { CustomerAddressResponse } from "@/@types/tray/customerAddress";
import { OrderResponseComplete } from "@/@types/tray/OrderComplete";
import { UpdateCustomer, UpdateCustomerData } from "@/@types/tray/updateCustomer";
import { UpdateCustomerResponse } from "@/@types/tray/updateCustomerResponse";
import { ShippingCotation } from "@/@types/tray/shippingCotation";
import { CartCreateServiceProps, CartDataProps, CartProduct } from "@/@types/tray/createCart";
import { CreateCartResponse } from "@/@types/tray/createCartResponse";
import { CategoryTreeResponse } from "@/@types/tray/categoryTreeResponse";
import { PaymentOptionsResponse } from "@/@types/tray/paymentOptions";
import { PaymentMethodsGroup, PaymentMethodsResponse } from "@/@types/tray/paymentsMethods";


export class IntegraApi {
    protected api: AxiosInstance
    protected readonly maxRetries = 3
    protected readonly retryDelay = 250

    constructor() {

        const url = process.env.NEXT_PUBLIC_BASE_URL;
        if (!url) debug.error("Variável de ambiente BASE_URL não configurada!");

        const headers: Record<string, string> = {
            "x-api-key": process.env.INTEGRA_API_KEY ?? ""
        }
        //if (typeof window === "undefined") headers["User-Agent"] = "loja-orya (contato@ericssongomes.com)"

        this.api = axios.create({
            baseURL: url,
            headers
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

    async getProducts(): Promise<Product[]> {
        try {
            const response = await this.api.get<ProductListResponse>("/product/all");
            const products = response.data.Products.map((product) => product.Product)
            return products;
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
            const response = await this.api.get<Product>(`/product/${id}`)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao buscar produto id ${id}: ${message}`, err);
            return null
        }
    }
    async getAllCategories(): Promise<CategoryList[] | null> {
        try {
            const response = await this.api.get<CategoryList[]>('/categories')
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao buscar categorias: ${message}`, err);
            return null
        }
    }
    async getCategoryTree(id: string): Promise<CategoryTreeResponse> {
        try {
            const tree = await this.api.get<CategoryTreeResponse>(`/categories/tree/${id}`)
            return tree.data
        } catch (err) {
            console.log("Erro ao buscar árvore da categoria", err)
            throw new Error('Erro ao buscar árvore de categorias dentro de categoryUtils')
        }
    }
    getProductsByCollection(products: ProductList, collection: string): Product[] {
        if (!Array.isArray(products)) {
            debug.error('Erro: "products" deve ser um array.')
            return []
        }
        //posso buscar o id da coleção comparando o nome da collection com os resultados da busca por categorias dentro da tray
        const productByCollection = products.filter((product: Product) => {
            if (typeof product !== 'object' || product === null) {
                debug.warn("Produto ignorado por estrutura invalida: ", product)
                return false
            }

            //precisa buscar as categorias no backend para comparar os nomes das categorias com a coleção

            return product.all_categories.some(cat =>
                cat &&
                typeof cat === 'string' &&
                cat.toLowerCase().includes(collection.toLowerCase()))
        }
        )
        return productByCollection
    }
    async getProductsByCategory(id: string): Promise<Product[]> {

        try {
            const response = await this.api.get<ProductListResponse>(`/product/category/${id}`)
            return response.data.Products.map(product => product.Product)
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao buscar categorias: ${message}`, err);
            return []
        }
    }


    async relatedProducts(product: ProductDetails, products: ProductList): Promise<Product[]> {
        const currentID = product.Product.id
        const relatedCategories = product.Product.related_categories ?? []

        const nameNormalize = (str: string) =>
            str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()

        const stem = (word: string): string => {
            let w = nameNormalize(word);

            w = w.replace(/(s|es|is|os|as)$/, "");
            w = w.replace(/(a|o)$/i, "");
            w = w.replace(/(ado|ada|idos|idas|eira|eiras|eiro|eiros|zinho|zinha|zinhos|zinhas)$/i, "");

            return w;
        };

        const splitAndStem = (name: string) =>
            nameNormalize(name)
                .split(/\s+/)
                .filter(w => w.length > 2)
                .map(stem)
                .filter(w => w.length > 1);

        const baseStems = new Set(splitAndStem(product.Product.name))


        /*
            Filtro por nome
        */
        const byName = products.filter(item => {
            if (item.id === currentID) return false
            const itemStems = splitAndStem(item.name)
            return itemStems.some(s => baseStems.has(s))
        })

        /*
            Busca por categoria
         */
        const categoryPromises = relatedCategories.map(catId => this.getProductsByCategory(catId))

        const categoryResultsArrays = await Promise.all(categoryPromises)

        const byCategory = categoryResultsArrays.flat()

        /*
            Unindo resultados
         */
        const finalMap = new Map<string, Product>()

        //add related por nome
        for (const p of byName) {
            finalMap.set(p.id, p)
        }

        //add related por categoria
        for (const p of byCategory) {
            if (p.id !== currentID) finalMap.set(p.id, p)
        }

        return Array.from(finalMap.values())
    }

    async newsLetter(news: NewsLetterProps): Promise<NewsLetterResponse | null> {
        try {
            const response = await this.api.post<NewsLetterResponse>('/newsletter', news)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao cadastrar newsletter: ${message}`, err);
            return null
        }
    }

    async login(email: string, password: string): Promise<LoginResponseInterface | null> {
        try {
            const response = await this.api.post<LoginResponseInterface>('/auth', {
                email, password
            })
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao realizar login: ${message}`, err);
            return null
        }
    }
    async createUser(data: CreateLoginProps): Promise<CreateUserResponse | null> {
        try {
            const response = await this.api.post<CreateUserResponse>('/auth/create', data)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao criar login para o cliente: ${message}`, err);
            return null
        }
    }
    async getUserDetails(id: string, /*baseUrl?: string */): Promise<UserLoginProps | null> {
        try {
            const response = await this.api.get<UserLoginProps>(`/user/${id}`)
            //console.log("resposta da apiTray no metodo de buscar dados do usuario", response.data)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao criar login para o cliente: ${message}`, err);
            return null
        }
    }

    async getCustomers(email?: string, cpf?: string): Promise<CustomersListResponse | null> {
        try {
            const response = await this.api.get<CustomersListResponse>("/customer", {
                params: { email, cpf, blocked: 0 }
            })
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao criar login para o cliente: ${message}`, err);
            return null
        }
    }
    async updateCustomer(id: string, data: UpdateCustomerData): Promise<UpdateCustomerResponse | null> {
        try {
            const response = await this.api.patch<UpdateCustomerResponse>(`/customer/${id}`, data)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao atualizar os dados do cliente na Tray: ${message}`, err);
            return null
        }
    }

    async getOrdersByCustomer(customerID: string): Promise<OrderWrap[]> {
        try {
            const response = await this.api.get<OrderWrap[]>("/orders", {
                params: { customer_id: customerID }
            })
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao criar login para o cliente: ${message}`, err);
            return []
        }
    }

    async getOrderDetails(id: string): Promise<OrderWrap | null> {
        try {
            const response = await this.api.get<OrderWrap>(`/orders/${id}`)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao criar login para o cliente: ${message}`, err);
            return null
        }
    }
    async getCompleteOrderDetails(id: string): Promise<OrderResponseComplete | null> {
        try {
            const response = await this.api.get<OrderResponseComplete>(`/orders/${id}/complete`)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao criar login para o cliente: ${message}`, err);
            return null
        }
    }

    async getAddressById(addressID: string): Promise<CustomerAddressResponse | null> {
        try {
            const response = await this.api.get<CustomerAddressResponse>(`/customer/address/${addressID}`)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao buscar dados do endereço do cliente: ${message}`, err);
            return null
        }
    }
    async getShippingCotation(data: ShippingCotation) {
        debug.log(data)
        try {
            const response = await this.api.post('/shipping/cotation', data)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            const response = error.response?.data
            debug.log(response)
            debug.error(`Erro ao buscar informações sobre frete: ${message}`, err);
            return null
        }
    }

    async getPaymentOptions(): Promise<PaymentMethodsGroup | null> {
        try {
            const response = await this.api.get<PaymentMethodsResponse>('/payment/all')
            console.log(response.data)
            const options = response.data.PaymentMethods
            return options
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message;
            const data = error.response?.data
            debug.error(`Erro ao buscar opções de pagamento da loja: ${message}`, err);
            debug.log("data da requisição de opções de pagamento", data)
            return null
        }
    }

}

export const apiTray = new IntegraApi()