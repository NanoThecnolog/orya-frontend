import { CartCreateServiceProps } from "@/@types/tray/createCart";
import { Product } from "@/@types/tray/products";
import { CartProps } from "@/contexts/mainContext";
import { Functions } from "@/utils/functions";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export class Cart {
    private cartItems: CartProps[];
    private setCartItems: Dispatch<SetStateAction<CartProps[]>>;

    constructor(cartItems: CartProps[], setCartItems: Dispatch<SetStateAction<CartProps[]>>) {
        this.cartItems = cartItems;
        this.setCartItems = setCartItems;
    }
    private hasItem(product: Product): boolean {
        return this.cartItems.some(item => item.product.id === product.id)
    }
    private updateCart(updater: SetStateAction<CartProps[]>): void {
        this.setCartItems(prev => {
            const updated = typeof updater === "function" ? updater(prev) : updater
            this.cartItems = updated
            this.syncLocalStorage()
            return updated
        })
        //this.setCartItems(updater)
    }
    private changeAmount(productID: string, delta: number): void {
        const prevItems = this.cartItems;
        const updated = prevItems
            .map(item => {
                if (item.product.id === productID) {
                    return { ...item, amount: item.amount + delta };
                }
                return item;
            })
            .filter(item => item.amount > 0);

        if (prevItems.length > updated.length) {
            toast.info("Produto removido do carrinho.");
        }

        this.updateCart(updated);
    }

    private syncLocalStorage() {
        const products = this.cartItems.map(item => ({
            product_id: item.product.id,
            quantity: item.amount
        }))
        const hasCart = Cart.getSavedCart()
        if (hasCart && hasCart.products.length === 0) {
            localStorage.removeItem('cart_data')
            return
        }
        const data: CartCreateServiceProps = {
            session_id: hasCart?.session_id || Functions.generateSessionID(),
            products
        }
        localStorage.setItem("cart_data", JSON.stringify(data))
    }

    addToCart(product: Product, amount: number = 1): void {
        if (this.hasItem(product)) this.changeAmount(product.id, amount)
        else {
            this.updateCart([...this.cartItems, { product, amount }])
            //this.setCartItems((prev) => [...prev, { product, amount: 1 }]);
            toast.success("produto adicionado ao carrinho!")
        }

    }
    subFromCart(product: Product): void {
        if (this.hasItem(product)) this.changeAmount(product.id, -1)
    }
    deleteProductFromCart(product: Product): void {
        if (this.hasItem(product)) {
            const updated = this.cartItems.filter(item => item.product.id !== product.id)
            this.updateCart(updated)
            toast.info("Produto removido do carrinho!")
        }
    }
    clearCart(): void {
        this.updateCart([])
        toast.info("Carrinho vazio!")
    }
    static saveCartLocal(data: CartCreateServiceProps) {
        localStorage.setItem("cart_data", JSON.stringify(data))
    }
    static getSavedCart(): CartCreateServiceProps | null {
        const data = localStorage.getItem('cart_data')
        return data ? JSON.parse(data) : null
    }

    static isSameCart(currentProducts: any[]) {
        const saved = this.getSavedCart();
        if (!saved) return false; // não existe carrinho salvo

        const savedProducts = saved.products;

        // compara quantidade de itens
        if (savedProducts.length !== currentProducts.length) {
            return false;
        }

        // compara item por item
        const equal = savedProducts.every((savedItem: any) => {
            const match = currentProducts.find(cp => cp.product_id === savedItem.product_id);
            if (!match) return false;

            return Number(match.quantity) === Number(savedItem.quantity);
        });

        return equal;
    };

}

