import { format } from '@/utils/formatContent'
import styles from './styles.module.scss'

interface CreditValueProps {
    plots: string | number
    value: string | number
}
export default function CreditValue({ plots, value }: CreditValueProps) {
    return (
        <span>ou <strong>{plots}x</strong> de <strong>{format.price(value.toString())}</strong></span>
    )
}