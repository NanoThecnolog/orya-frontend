import { MenuProps } from "@/@types/Menu";
import { Product, ProductList } from "@/@types/nuvemshop/products";
import { renderMenu } from "@/services/classes/menu";
import { debug } from "@/utils/DebugLogger";
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    menu: MenuProps[]
}

interface signInProps {
    email: string,
    password: string
}



export const mainContext = createContext<MainContextProps>({
    cartOpen: false,
    setCartOpen: (/*data: boolean */) => { },
    cartItems: [],
    setCartItems: () => { },
    productList: [],
    setProductList: () => { },
    menu: []
})

export function MainProvider({ children }: MainProviderProps) {
    const [cartOpen, setCartOpen] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<CartProps[]>([])
    const [productList, setProductList] = useState<ProductList>([])
    const [menu, setMenu] = useState<MenuProps[]>([])

    const getProducts = async () => {
        const products = await axios.get<ProductList>("/api/products")
        setProductList(products.data)
    }
    const getMenu = async () => {
        const menu = renderMenu.menu(productList)
        setMenu(menu)
    }

    useEffect(() => {
        if (productList.length === 0) getProducts()
    }, [])
    useEffect(() => {
        if (productList.length > 0) getMenu()
        else getProducts()
    }, [productList])

    //logica de login

    const signIn = async ({ email, password }: signInProps) => {
        try {
            const login = await axios.get('/api/auth/login', {
                data: {
                    email, password
                }
            })
            const dataUser = login.data
            toast.success("Bem vindo!")
        } catch (err) {
            debug.log("Email ao autenticar usuario", err)
            toast.error("Erro ao tentar realizar login. Verifique seu email e sua senha, e tente novamente")
        }
    }

    return (
        <mainContext.Provider value={{ cartOpen, setCartOpen, cartItems, setCartItems, productList, setProductList, menu }}>
            {children}
        </mainContext.Provider>
    )
}

export const useMain = () => {
    return useContext(mainContext)
}