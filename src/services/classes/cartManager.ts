import { Product } from "@/@types/tray/products";
import { CartProps } from "@/contexts/mainContext";
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
        /*const hasItem = this.cartItems.find(item => item.product.id === product.id)
        if (hasItem) return true
        return false*/
        return this.cartItems.some(item => item.product.id === product.id)
    }
    private updateCart(updater: SetStateAction<CartProps[]>): void {
        this.setCartItems(updater)
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
            //this.updateCart(prev => prev.filter(item => item.product.id !== product.id))
            //toast.success("produto removido do carrinho!")
        }
    }
    clearCart(): void {
        this.setCartItems([])
        toast.info("Carrinho vazio!")
    }
    addShipping(): void {

    }
}

