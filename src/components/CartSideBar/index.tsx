import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useMain } from "@/contexts/mainContext";
import { format } from "@/utils/formatContent";

type CartItem = {
    id: number;
    name: string;
    price: number;
};



export default function CartSidebar() {
    const { cartOpen, setCartOpen } = useMain()
    const { cartItems, setCartItems } = useMain()
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const toggleCart = () => setCartOpen(!cartOpen);

    useEffect(() => {

        setTotalPrice(cartItems.reduce((sum, item) => sum + Number(item.product?.variants?.[0]?.price) * item.amount, 0))
    }, [cartItems])

    return (
        <>
            <aside className={`${styles.cartSidebar} ${cartOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <span>Carrinho</span>
                    <button onClick={toggleCart}>&times;</button>
                </div>

                <div className={styles.items}>
                    {cartItems.length === 0 && <p>Carrinho vazio</p>}
                    {cartItems.map(item => (
                        <div key={item.product.id} className={styles.item}>
                            <span className="name">{item.product.name.pt}</span>
                            <span>{item.amount}</span>
                            <span className="price">{format.price(Number(item.product.variants?.[0]?.price).toFixed(2))}</span>
                        </div>
                    ))}
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
