export interface UpdateCustomerData {
    name: string
    rg: string
    cpf: string
    phone: string
    cellphone: string
    birth_date: string
    gender: string
    email: string
    nickname?: string
    observation?: string
    type: string
    company_name?: string
    cnpj?: string
    state_inscription: string
    reseller: string
    discount: string
    blocked: string
    credit_limit: string
    indicator_id: string
    profile_customer_id: string
    newsletter: string
}

export interface UpdateCustomer {
    Customer: UpdateCustomerData
}
