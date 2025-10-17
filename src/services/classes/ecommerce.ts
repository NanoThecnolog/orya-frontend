import { Product } from "@/@types/nuvemshop/products";
import { CartProps } from "@/contexts/mainContext";
import { Dispatch, SetStateAction } from "react";

export class Ecommerce {
    private cartItems: CartProps[];
    private setCartItems: Dispatch<SetStateAction<CartProps[]>>;

    constructor(cartItems: CartProps[], setCartItems: Dispatch<SetStateAction<CartProps[]>>) {
        this.cartItems = cartItems;
        this.setCartItems = setCartItems;
    }
    private hasItem(product: Product): boolean {
        const hasItem = this.cartItems.find(item => item.product.id === product.id)
        if (hasItem) return true
        return false
    }
    private updateCart(updater: SetStateAction<CartProps[]>): void {
        this.setCartItems(updater)
    }
    private changeAmount(productID: number, delta: number): void {
        this.updateCart(prev =>
            prev.map(item =>
                item.product.id === productID
                    ? { ...item, amount: item.amount + delta }
                    : item
            ).filter(item => item.amount > 0)
        )
    }

    addToCart(product: Product): void {
        const hasItem = this.hasItem(product)
        if (hasItem) this.changeAmount(product.id, 1)
        else this.setCartItems((prev) => [...prev, { product, amount: 1 }]);
    }
    subFromCart(product: Product): void {
        const hasItem = this.hasItem(product)
        if (hasItem) this.changeAmount(product.id, -1)
    }
    deleteProductFromCart(product: Product): void {
        const hasItem = this.hasItem(product)
        if (hasItem) this.updateCart(prev => prev.filter(item => item.product.id !== product.id))
    }
    clearCart(): void {
        this.setCartItems([])
    }
}

