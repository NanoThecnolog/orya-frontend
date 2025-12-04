import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useMain } from "@/contexts/mainContext";
import { format } from "@/utils/formatContent";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Cart } from "@/services/classes/cartManager";
import { Product } from "@/@types/tray/products";
import { productsImages } from "@/common/variables/products";
import { useRouter } from "next/navigation";
import { Functions } from "@/utils/functions";
import axios from "axios";
import { Cotation, ShippingCotationResponse } from "@/@types/tray/shippingCotation";
import { CartCreateServiceProps, CartDataProps } from "@/@types/tray/createCart";
import { debug } from "@/utils/DebugLogger";
import { CreateCartResponse } from "@/@types/tray/createCartResponse";
import { toast } from "react-toastify";

type CartItem = {
    id: number;
    name: string;
    price: number;
};

export default function CartSidebar() {
    const router = useRouter()
    const functions = new Functions(router)
    const { cartOpen, setCartOpen } = useMain()
    const { cartItems, setCartItems } = useMain()
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [subTotal, setSubTotal] = useState<number>(0)
    const [shipping, setShipping] = useState<number | null>(null)
    const [cep, setCep] = useState("")
    const [cotation, setCotation] = useState<Cotation[]>([])

    const toggleCart = () => setCartOpen(!cartOpen);

    useEffect(() => {
        setTotalPrice(cartItems.reduce((sum, item) => sum + Number(item.product?.price) * item.amount, 0) + (shipping ?? 0))
        setSubTotal(cartItems.reduce((sum, item) => sum + Number(item.product?.price) * item.amount, 0))
    }, [cartItems, shipping])

    const handleAmount = (product: Product, operation: "add" | "sub" | "remove") => {
        const cart = new Cart(cartItems, setCartItems)
        if (operation === "add") cart.addToCart(product)
        if (operation === "sub") cart.subFromCart(product)
        if (operation === "remove") cart.deleteProductFromCart(product)
    }

    const handleCalculateShipping = async () => {


        const products = cartItems.map(item => {
            return {
                product_id: item.product.id,
                price: item.product.price,
                quantity: item.amount
            }
        })

        try {
            const response = await axios.post<ShippingCotationResponse>('/api/shipping/cotation', {
                zipcode: cep,
                products
            })
            const shippingCotation = response.data
            //if(!shippingCotation) throw new Error("Erro ao realizar cotação")
            console.log(shippingCotation)
            if (!shippingCotation || !shippingCotation.Shipping.cotation) {
                setCep('')
                setCotation([])
                return toast.error("CEP não encontrado. Verifique o cep e tente novamente")
            }
            setCotation(shippingCotation.Shipping.cotation ?? [])
        } catch (err) {
            console.error("Erro ao realizar cotação de frete", err)
        }
    }

    const handleFinishBuy = async () => {
        const tempWindow = window.open('', '_blank')
        //criar carrinho fazendo requisição pra cada produto do carrinho utilizando o mesmo sessionID
        toast.info("Obrigado pela sua compra! Agora você será direcionado para o checkout do seu pedido.", {
            toastId: "buy-toast",
            position: "top-center",
            autoClose: false,
            closeButton: false,
            closeOnClick: false,
            draggable: false,
            progress: undefined
        })

        const currentProducts = cartItems.map(item => ({ product_id: item.product.id, quantity: item.amount.toString() }))

        const saved = Cart.getSavedCart()
        let sessionID = saved?.session_id || ""


        //const sessionID = Functions.generateSessionID()


        if (!saved || !Cart.isSameCart(currentProducts)) sessionID = Functions.generateSessionID()

        const cart: CartCreateServiceProps = {
            session_id: sessionID,
            products: currentProducts
        }

        try {
            const response = await axios.post<CreateCartResponse>('/api/cart/create', cart)
            const createdCart = response.data
            const url = createdCart.cart_url

            debug.log("URL DO CHECKOUT:", url);
            Cart.saveCartLocal(cart)

            if (tempWindow) tempWindow.location.href = url;

            toggleCart()
            toast.dismiss("buy-toast")

        } catch (err) {
            debug.error("Erro ao criar carrinho e finalizar compra", err)
            toast.error("Erro ao finalizar a compra", { toastId: "buy-error" });

            if (tempWindow) tempWindow.close();
        }
    }

    return (
        <>
            <aside className={`${styles.cartSidebar} ${cartOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <h3>Carrinho</h3>
                    <button onClick={toggleCart}>&times;</button>
                </div>

                <div className={styles.items}>
                    {cartItems.length === 0 && <p>Carrinho vazio</p>}
                    {cartItems.map(item => {
                        if (!item?.product) return null
                        const imgData = productsImages.find(i => i.trayID === item.product.id);
                        const code = imgData?.codeImg?.[0];
                        const image = code !== undefined
                            ? functions.imagePath(code)
                            : "/img/sem-foto.png";
                        return (
                            <div key={`${item.product.id} - ${item.product.name}`} className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={image}
                                        alt={item.product.name}
                                        fill
                                        priority={false}
                                        className={styles.image}
                                        onClick={() => functions.pushProductPage(item.product.shortcut)}
                                    />
                                </div>
                                <div className={styles.cartItemDetails}>
                                    <h4 className={styles.name}>{item.product.name}</h4>
                                    <div className={styles.amount}>
                                        <IoIosRemove className={styles.removeButton} size={25} onClick={() => handleAmount(item.product, "sub")} />
                                        <p>{item.amount}</p>
                                        <IoIosAdd className={styles.addButton} size={25} onClick={() => handleAmount(item.product, "add")} />
                                    </div>
                                </div>
                                <div className={styles.priceContainer}>
                                    <p className={styles.price}>{format.price(item.product.price.toString())}</p>
                                    <FaTrash title="excluir" onClick={() => handleAmount(item.product, "remove")} />
                                </div>
                            </div>
                        )
                    })}
                    {
                        cartItems.length > 0 && <div className={styles.subTotalContainer}>
                            <h4>subtotal (sem frete)</h4>
                            <p>{format.price(subTotal.toString())}</p>
                        </div>
                    }<div className={styles.shippingContainer}>
                        {cartItems.length > 0 && (
                            <>
                                <h4>Calcular Frete</h4>

                                <div className={styles.cepRow}>
                                    <input
                                        type="text"
                                        maxLength={8}
                                        placeholder="Digite seu CEP"
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                                        className={styles.cepInput}
                                    />

                                    <button
                                        type="button"
                                        onClick={handleCalculateShipping}
                                        className={styles.cepButton}
                                    >
                                        Calcular
                                    </button>
                                </div>
                                {
                                    cotation && cotation.length > 0 &&
                                    <div className={styles.cotationContainer}>
                                        {cotation.map((item, index) => (
                                            <div key={index} className={styles.cotation}>
                                                <div className={styles.cotationInfo}>
                                                    <p>{item.name}</p>
                                                    <p>{item.information}</p>
                                                </div>
                                                <div className={styles.cotationPrice}>
                                                    <p>{format.price(item.value.toString())}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }

                                <p>{
                                    //shipping && format.price(shipping.toString())
                                }</p>
                            </>
                        )}
                    </div>

                </div>

                {
                    cartItems.length > 0 && <div className={styles.footer}>
                        <button onClick={handleFinishBuy}>Finalizar Compra</button>
                    </div>
                }
            </aside>
        </>
    );
}
