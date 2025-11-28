//import { useRouter } from 'next/navigation';
import { oryaData } from '@/common/variables/oryaData';
import styles from './styles.module.scss'
import { RiWhatsappFill } from "react-icons/ri";

export default function WhatsappButton() {
    function handleClick() {
        window.open(
            oryaData.whatsappLink,
            '_blank',
            'noopener,noreferrer'
        );
    }
    return (
        <div onClick={handleClick} className={styles.buttonContainer}>
            <RiWhatsappFill size={45} className={styles.iconGradient} />
        </div>
    )
}