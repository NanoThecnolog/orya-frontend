import { useState } from "react";
import styles from "./styles.module.scss";
import { useMain } from "@/contexts/mainContext";

type CartItem = {
    id: number;
    name: string;
    price: number;
};

type CartSidebarProps = {
    items: CartItem[];
};

export default function CartSidebar({ items }: CartSidebarProps) {
    const { cartOpen, setCartOpen } = useMain()

    const toggleCart = () => setCartOpen(!cartOpen);

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <aside className={`${styles.cartSidebar} ${cartOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <span>Carrinho</span>
                    <button onClick={toggleCart}>&times;</button>
                </div>

                <div className={styles.items}>
                    {items.length === 0 && <p>Carrinho vazio</p>}
                    {items.map(item => (
                        <div key={item.id} className={styles.item}>
                            <span className="name">{item.name}</span>
                            <span className="price">R${item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <p>Total: R${total.toFixed(2)}</p>
                    <button>Finalizar Compra</button>
                </div>
            </aside>
        </>
    );
}
