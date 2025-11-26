import { FormEvent, useState } from 'react';
import styles from './styles.module.scss';
import { CustomerAddressResponse } from '@/@types/tray/customerAddress';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UpdateCustomerResponse } from '@/@types/tray/updateCustomerResponse';
import { useMain } from '@/contexts/mainContext';
import { CustomersListResponse } from '@/@types/tray/getCustomersResponse';

export interface DataProps {
    name: string,
    email: string,
    birth_date: string,
    cpf?: string,
    cnpj?: string,
}
interface CustomerForm {
    name: string;
    birth_date: string;
    cpf?: string;
    cnpj: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
}
interface EditModalProps {
    customerID: string,
    data: DataProps,
    address: CustomerAddressResponse | null,
    onClose: () => void
}


export default function EditCustomerModal({ customerID, data, address, onClose }: EditModalProps) {
    const { customer, setCustomer } = useMain()
    const [form, setForm] = useState<CustomerForm>({
        name: data.name,
        birth_date: data.birth_date,
        cpf: data.cpf,
        cnpj: data.cnpj || "",
        address: address?.CustomerAddress.address || "",
        number: address?.CustomerAddress.number || "",
        neighborhood: address?.CustomerAddress.neighborhood || "",
        city: address?.CustomerAddress.city || "",
        state: address?.CustomerAddress.state || "",
        zip_code: address?.CustomerAddress.zip_code || "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // enviar ao backend
        try {
            console.log('Data enviado', form)
            const response = await axios.patch<UpdateCustomerResponse>(`/api/customer/update/${customerID}`, form);
            if (response.data.code !== 200) toast.error("Erro ao alterar dados. Entre em contato ou tente novamente mais tarde.")
            console.log(response.data)

            // opcional: atualizar contexto / fazer refetch do usuário
            const updatedData = await axios.get<CustomersListResponse>('/api/customers', {
                params: { email: data.email }
            })
            const customer = updatedData.data.Customers[0].Customer
            setCustomer(customer)

            toast.success("Dados alterados com sucesso!")
            onClose();
        } catch (err) {
            console.error(err);
            toast.warning("Dados não alterados. Entre em contato ou tente novamente mais tarde.")
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Editar Dados</h3>

                <form onSubmit={handleSubmit} className={styles.form}>

                    <label>
                        Nome
                        <input name="name" value={form.name} onChange={handleChange} />
                    </label>

                    <label>
                        Data de nascimento
                        <input name="birth_date" value={form.birth_date} onChange={handleChange} />
                    </label>

                    <label>
                        CPF
                        <input name="cpf" value={form.cpf} onChange={handleChange} />
                    </label>

                    <label>
                        CNPJ
                        <input name="cnpj" value={form.cnpj} onChange={handleChange} />
                    </label>

                    <hr />

                    <h4>Endereço</h4>

                    <label>
                        Endereço
                        <input name="address" value={form.address} onChange={handleChange} />
                    </label>

                    <label>
                        Número
                        <input name="number" value={form.number} onChange={handleChange} />
                    </label>

                    <label>
                        Bairro
                        <input name="neighborhood" value={form.neighborhood} onChange={handleChange} />
                    </label>

                    <label>
                        Cidade
                        <input name="city" value={form.city} onChange={handleChange} />
                    </label>

                    <label>
                        Estado
                        <input name="state" value={form.state} onChange={handleChange} />
                    </label>

                    <label>
                        CEP
                        <input name="zip_code" value={form.zip_code} onChange={handleChange} />
                    </label>

                    <div className={styles.buttons}>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
