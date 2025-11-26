import { MenuProps } from "@/@types/Menu";
import { CreateUserProps } from "@/@types/tray/createUserProps";
import { CreateUserResponse } from "@/@types/tray/createUserResponse";
import { CustomerListItem, CustomersListResponse } from "@/@types/tray/getCustomersResponse";
import { LoginResponseInterface, UserLoginProps } from "@/@types/tray/loginProps";
import { Product } from "@/@types/tray/products";
import { renderMenu } from "@/services/classes/menu";
import { Validator } from "@/services/classes/validator";
import { debug } from "@/utils/DebugLogger";
import axios from "axios";
import { useRouter } from "next/navigation";
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
    productList: Product[]
    setProductList: Dispatch<SetStateAction<Product[]>>
    menu: MenuProps[]
    signIn: (data: signInProps) => void
    signUp: (data: CreateUserProps) => void
    user: UserLoginProps | null
    setUser: (data: UserLoginProps) => void
    customer: CustomerListItem | null
    setCustomer: (data: CustomerListItem) => void
}

interface signInProps {
    email: string,
    password: string
}



export const mainContext = createContext<MainContextProps>({
    cartOpen: false,
    cartItems: [],
    productList: [],
    menu: [],
    user: null,
    customer: null,
    setCartOpen: () => { },
    setCartItems: () => { },
    setProductList: () => { },
    signIn: () => { },
    signUp: () => { },
    setUser: () => { },
    setCustomer: () => { }

})

export function MainProvider({ children }: MainProviderProps) {
    const router = useRouter()
    const [cartOpen, setCartOpen] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<CartProps[]>([])
    const [productList, setProductList] = useState<Product[]>([])
    const [menu, setMenu] = useState<MenuProps[]>([])
    const [user, setUser] = useState<UserLoginProps | null>(null)
    const [customer, setCustomer] = useState<CustomerListItem | null>(null)

    const getProducts = async () => {
        const products = await axios.get<Product[]>("/api/products")
        setProductList(products.data)
    }
    const getMenu = async () => {
        const menu = await renderMenu.menu(productList)
        setMenu(menu)
    }

    useEffect(() => {
        const getCustomerDetails = async () => {
            try {
                const response = await axios.get<CustomersListResponse>('/api/customers', {
                    params: { email: user?.email }
                })
                const customer = response.data.Customers[0].Customer
                setCustomer(customer)
            } catch (err) {
                debug.log("Erro ao buscar dados do cliente no context")
            }
        }
        if (user) getCustomerDetails()
    }, [user])

    useEffect(() => {
        if (productList.length === 0) getProducts()
    }, [])
    useEffect(() => {
        if (productList.length > 0) getMenu()
        else getProducts()
    }, [productList])

    const signIn = async ({ email, password }: signInProps) => {
        try {
            const login = await axios.post<LoginResponseInterface>('/api/auth/login',
                { email, password })
            const dataUser = login.data
            setUser(dataUser.user)
            toast.success(`Olá ${dataUser.user.name}, Bem vindo!`)
            setTimeout(() => {
                router.push('/me')
            }, 2000)
        } catch (err) {
            debug.log("Email ao autenticar usuario", err)
            toast.error("Erro ao tentar realizar login. Verifique seu email e senha, ou tente novamente mais tarde!")
        }
    }
    const signUp = async (data: CreateUserProps) => {

        try {
            const response = await axios.post('/api/auth/create', data)
            toast.success("Acesso criado com sucesso! Você será redirecionado agora para pagina de login!")
            setTimeout(() => {
                router.push('/auth/login')
            }, 3000)
        } catch (err) {
            debug.log("Erro ao cadastrar usuário", err)
            toast.error("Ocorreu um erro ao criar o usuário. Verifique seus dados e tentem novamente")
            return null
        }
    }

    return (
        <mainContext.Provider value={{ cartOpen, user, cartItems, menu, productList, customer, setUser, setCartItems, setProductList, signIn, signUp, setCartOpen, setCustomer }}>
            {children}
        </mainContext.Provider>
    )
}

export const useMain = () => {
    return useContext(mainContext)
}