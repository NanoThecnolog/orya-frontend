import { useMain } from '@/contexts/mainContext'
import styles from './styles.module.scss'
import { CustomerListItem } from '@/@types/tray/getCustomersResponse'
import { CustomerAddressResponse } from '@/@types/tray/customerAddress'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import EditCustomerModal, { DataProps } from './EditCustomerModal'
import { format } from '@/utils/formatContent'

interface CustomerDataProps {
    data: CustomerListItem | null
    address: CustomerAddressResponse | null
}

export default function CustomerData({ data, address }: CustomerDataProps) {
    const [openModal, setOpenModal] = useState(false)
    const [userData, setUserData] = useState<DataProps | null>(null)
    const { customer, setCustomer } = useMain()

    useEffect(() => {
        if (data) setCustomer(data)
    }, [data])

    useEffect(() => {
        const settingUserData = () => {

            const props: DataProps = {
                name: data?.name ?? "",
                email: data?.email ?? "",
                birth_date: data?.birth_date ?? "",
                cpf: data?.cpf,
                cnpj: data?.cnpj
            }
            setUserData(props)
        }
        if (data) settingUserData()
    }, [data])

    if (!data) return <div>Carregando dados...</div>
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2>Meus Dados</h2>
                <FaEdit onClick={() => setOpenModal(true)} size={25} title='Editar dados' />
            </div>

            <div className={styles.infoGrid}>
                <div className={styles.item}>
                    <span className={styles.label}>Nome</span>
                    <p className={styles.value}>{customer?.name}</p>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Email</span>
                    <p className={styles.value}>{data.email}</p>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>Data de nascimento</span>
                    <p className={styles.value}>{format.date(customer?.birth_date ?? "")}</p>
                </div>

                <div className={styles.item}>
                    <span className={styles.label}>CPF</span>
                    <p className={styles.value}>{customer?.cpf}</p>
                </div>

                {data.cnpj && (
                    <div className={styles.item}>
                        <span className={styles.label}>CNPJ</span>
                        <p className={styles.value}>{customer?.cnpj}</p>
                    </div>
                )}
                {address?.CustomerAddress && (
                    <div className={styles.item}>
                        <span className={styles.label}>Endereço</span>

                        <p className={styles.value}>
                            {address.CustomerAddress.address}, {address.CustomerAddress.number}
                        </p>

                        <p className={styles.value}>
                            {address.CustomerAddress.city} - {address.CustomerAddress.state}
                        </p>

                        <p className={styles.value}>
                            {address.CustomerAddress.neighborhood}
                        </p>

                        <p className={styles.value}>
                            CEP: {address.CustomerAddress.zip_code}
                        </p>
                    </div>
                )}

            </div>
            {openModal && userData && (
                <EditCustomerModal
                    customerID={data.id}
                    data={userData}
                    address={address}
                    onClose={() => setOpenModal(false)}
                />
            )}
        </section>
    )
}