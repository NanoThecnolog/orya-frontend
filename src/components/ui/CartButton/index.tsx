import styles from './styles.module.scss'

interface ButtonProps {
    handleClick: () => void
}
export default function SendCartButton({ handleClick }: ButtonProps) {
    return (
        <button
            className={styles.button}
            type='button'
            onClick={handleClick}
        >
            Adicionar ao Carrinho
        </button>
    )
}