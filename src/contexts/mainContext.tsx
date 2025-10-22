import { Product, ProductList } from "@/@types/nuvemshop/products";
import { nuvemshop } from "@/services/classes/nuvemshop";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface MainProviderProps {
    children: ReactNode;
}
export interface CartProps {
    product: Product
    amount: number
}
interface MainContextProps {
    cartOpen: boolean,
    setCartOpen: Dispatch<SetStateAction<boolean>>
    cartItems: CartProps[],
    setCartItems: Dispatch<SetStateAction<CartProps[]>>
    productList: ProductList
    setProductList: Dispatch<SetStateAction<ProductList>>
}



export const mainContext = createContext<MainContextProps>({
    cartOpen: false,
    setCartOpen: (/*data: boolean */) => { },
    cartItems: [],
    setCartItems: () => { },
    productList: [],
    setProductList: () => { }
})

export function MainProvider({ children }: MainProviderProps) {
    const [cartOpen, setCartOpen] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<CartProps[]>([])
    const [productList, setProductList] = useState<ProductList>([])

    useEffect(() => {
        const getProducts = async () => {
            const products = await nuvemshop.getProducts()
            setProductList(products)
        }
        if (productList.length === 0) getProducts()
    }, [productList])

    return (
        <mainContext.Provider value={{ cartOpen, setCartOpen, cartItems, setCartItems, productList, setProductList }}>
            {children}
        </mainContext.Provider>
    )
}

export const useMain = () => {
    return useContext(mainContext)
}