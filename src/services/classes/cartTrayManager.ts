import { AxiosError } from "axios";
import { IntegraApi } from "./IntegraApi";
import { debug } from "@/utils/DebugLogger";
import { CartCreateServiceProps, CartDataProps, CartProduct } from "@/@types/tray/createCart";
import { CreateCartResponse } from "@/@types/tray/createCartResponse";
import { CartTrayProduct, CartTrayResponse } from "@/@types/tray/getCartTrayResponse";

export class CartTrayManager extends IntegraApi {
    constructor() {
        super()
    }


    async createCart(data: CartDataProps): Promise<CreateCartResponse | null> {
        const carrinho = {
            Cart: data
        }
        try {
            const response = await this.api.post("/cart/create", carrinho)
            return response.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string, trayResponse?: { code: number, url: string, name: string, causes: Object } }>;
            const message = error.response?.data?.message || error.message;
            debug.error(`Erro ao criar carrinho na tray: ${message}`, error.response?.data?.trayResponse?.causes);
            return null
        }
    }


    async createCartWithMultipleProducts(data: CartCreateServiceProps): Promise<CreateCartResponse | string | null> {
        if (data.products.length < 1) return null
        const { session_id, products } = data

        const first = await this.createCart({
            session_id: session_id,
            product_id: parseFloat(products[0].product_id),
            quantity: parseFloat(products[0].quantity)
        })
        if (!first) return "Erro ao criar carrinho."


        for (let i = 1; i < products.length; i++) {
            await this.sendItemWithRetry(session_id, products[i])
        }

        await this.ensureFinalCartState(session_id, products)

        return first
    }


    private async sendItemWithRetry(session_id: string, item: CartProduct) {
        let attempt = 0

        while (attempt < this.maxRetries) {
            attempt++

            const res = await this.createCart({
                product_id: parseFloat(item.product_id),
                quantity: parseFloat(item.quantity),
                session_id
            })

            if (res) return
            await this.sleep(this.retryDelay)
        }
        throw new Error(`Fala ao adicionar produto após ${this.maxRetries} tentativas`)
    }

    private async ensureFinalCartState(session_id: string, items: CartProduct[]) {
        const cart = await this.getCart(session_id)
        if (!cart) return
        const missing: CartProduct[] = [];

        for (const item of items) {
            const exists = cart.Cart.Products.find((i: CartTrayProduct) => i.id === item.product_id);
            if (!exists) missing.push(item);
        }

        // reenvia itens faltando
        for (const item of missing) {
            await this.sendItemWithRetry(session_id, item);
        }
    }

    async getCart(session_id: string): Promise<CartTrayResponse | null> {
        try {
            const response = await this.api.get(`/cart/${session_id}`);
            return response.data;
        } catch (err) {
            return null;
        }
    }

    private async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export const cartTrayManager = new CartTrayManager()