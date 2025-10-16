import { Product } from "@/@types/nuvemshop/products";
import { CartProps } from "@/contexts/mainContext";
import { Dispatch, SetStateAction } from "react";

export class Ecommerce {
    private cartItems: CartProps[];
    private setCartItems: Dispatch<SetStateAction<CartProps[]>>;

    constructor(cartItems: CartProps[], setCartItems: Dispatch<SetStateAction<CartProps[]>>) {
        this.cartItems = cartItems,
            this.setCartItems = setCartItems
    }

    addToCart(product: Product) {
        const hasItem = this.cartItems.find(item => item.product.id === product.id)
        if (hasItem) {
            this.setCartItems((prev) =>
                prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                )
            );
        } else {
            this.setCartItems((prev) => [...prev, { product, amount: 1 }]);
        }
    }
}

