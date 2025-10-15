import { orderFilter } from '@/common/variables/orderFilter'
import styles from './styles.module.scss'
import { useState } from 'react'

export default function OrderFilter() {
    const [selectOrder, setSelectOrder] = useState<string>("")
    return (
        <div className={styles.container}>
            <h3>Produtos</h3>
            <select
                name=""
                id=""
                value={selectOrder}
                onChange={(e) => setSelectOrder(e.target.value)}
            >
                {
                    orderFilter.map((item, index) =>
                        <option key={index} value={item.value}>{item.name}</option>
                    )
                }
            </select>
        </div>
    )
}