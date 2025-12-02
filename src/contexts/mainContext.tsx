import { MenuProps } from "@/@types/Menu";
import { CartCreateServiceProps } from "@/@types/tray/createCart";
import { CreateUserProps } from "@/@types/tray/createUserProps";
import { CreateUserResponse } from "@/@types/tray/createUserResponse";
import { CustomerListItem, CustomersListResponse } from "@/@types/tray/getCustomersResponse";
import { LoginResponseInterface, UserLoginProps } from "@/@types/tray/loginProps";
import { PaymentOption } from "@/@types/tray/paymentOptions";
import { PaymentMethod, PaymentMethodsGroup } from "@/@types/tray/paymentsMethods";
import { Product } from "@/@types/tray/products";
import { Cart } from "@/services/classes/cartManager";
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
    paymentOptions: PaymentMethod[]
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
    paymentOptions: [],
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
    const [paymentOptions, setPaymentOptions] = useState<PaymentMethod[]>([])
    const inConstruction = false



    const getProducts = async () => {
        const products = await axios.get<Product[]>("/api/products")
        setProductList(products.data)
    }
    const getMenu = async () => {
        const menu = await renderMenu.menu(productList)
        setMenu(menu)
    }



    useEffect(() => {
        debug.log(cartItems)
    }, [cartItems]);
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
    useEffect(() => {
        //if (inConstruction) return
        try {
            if (productList.length === 0) return
            const stored = localStorage.getItem('cart_data')
            //debug.log("stored", stored)
            if (!stored) return
            const parsed: CartCreateServiceProps = JSON.parse(stored)
            //debug.log("stored parsed", parsed)
            const products: CartProps[] = parsed.products.map((p) => {
                const product = productList.find(product => product.id === p.product_id)
                if (!product) return null
                return {
                    product: product,
                    amount: Number(p.quantity)
                } as CartProps
            })
                .filter((item): item is CartProps => item !== null)
            if (Array.isArray(parsed.products)) {
                //debug.log("tudo certo, setando cartItems", products)
                setCartItems(products)
            }
        } catch (err) {
            debug.error("Erro ao iniciar estado do carrinho", err)
        }
    }, [productList])

    useEffect(() => {
        const getPaymentOptions = async () => {
            try {
                const response = await axios.get<PaymentMethodsGroup>('/api/payment/methods')
                const options = response.data
                setPaymentOptions(options.credit)
            } catch (err) {
                debug.error("Erro ao buscar opções de pagamentos")
            }
        }
        if (!paymentOptions) getPaymentOptions()
    }, [])

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
        <mainContext.Provider value={{ cartOpen, user, cartItems, menu, productList, customer, paymentOptions, setUser, setCartItems, setProductList, signIn, signUp, setCartOpen, setCustomer }}>
            {children}
        </mainContext.Provider>
    )
}

export const useMain = () => {
    return useContext(mainContext)
}