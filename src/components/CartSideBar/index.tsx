import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useMain } from "@/contexts/mainContext";
import { format } from "@/utils/formatContent";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Ecommerce } from "@/services/classes/ecommerce";
import { Product } from "@/@types/nuvemshop/products";

type CartItem = {
    id: number;
    name: string;
    price: number;
};



export default function CartSidebar() {
    const { cartOpen, setCartOpen } = useMain()
    const { cartItems, setCartItems } = useMain()
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [subTotal, setSubTotal] = useState<number>(0)
    const [shipping, setShipping] = useState<number>(0)

    const toggleCart = () => setCartOpen(!cartOpen);

    useEffect(() => {
        setTotalPrice(cartItems.reduce((sum, item) => sum + Number(item.product?.variants?.[0]?.price) * item.amount, 0) + shipping)
        setSubTotal(cartItems.reduce((sum, item) => sum + Number(item.product?.variants?.[0]?.price) * item.amount, 0))
    }, [cartItems, shipping])

    const handleAmount = (product: Product, operation: "add" | "sub" | "remove") => {
        const ecommerce = new Ecommerce(cartItems, setCartItems)
        if (operation === "add") ecommerce.addToCart(product)
        if (operation === "sub") ecommerce.subFromCart(product)
        if (operation === "remove") ecommerce.deleteProductFromCart(product)
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
                        const image = item.product.images?.[1]?.src ?? "/img/sem-foto.png"
                        return (
                            <div key={item.product.id} className={styles.item}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={image}
                                        alt={item.product.name.pt}
                                        fill
                                        priority={false}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.cartItemDetails}>
                                    <h4 className={styles.name}>{item.product.name.pt}</h4>
                                    <div className={styles.amount}>
                                        <IoIosRemove className={styles.removeButton} size={25} onClick={() => handleAmount(item.product, "sub")} />
                                        <p>{item.amount}</p>
                                        <IoIosAdd className={styles.addButton} size={25} onClick={() => handleAmount(item.product, "add")} />
                                    </div>
                                </div>
                                <div className={styles.priceContainer}>
                                    <p className={styles.price}>{format.price(item.product.variants?.[0]?.price)}</p>
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
                    }
                </div>

                <div>
                    <button onClick={() => setCartItems([])}>Limpar carrinho</button>
                </div>

                <div className={styles.footer}>
                    <p>Total: {format.price(totalPrice.toFixed(2))}</p>
                    <button>Finalizar Compra</button>
                </div>
            </aside>
        </>
    );
}
