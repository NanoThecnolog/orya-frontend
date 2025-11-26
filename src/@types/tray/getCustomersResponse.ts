export interface Paging {
    total: number
    page: number
    offset: number
    limit: number
    maxLimit: number
}

export interface SortItem {
    id: string
}

export interface CustomerAddressListItem {
    id: string
}

export interface CustomerListItem {
    id: string
    name: string
    cpf: string
    birth_date: string
    gender: string
    email: string
    cnpj: string
    last_visit: string
    city: string
    state: string
    newsletter: string
    created: string
    registration_date: string
    modified: string
    CustomerAddress: CustomerAddressListItem[]
}

export interface CustomerWrapper {
    Customer: CustomerListItem
}

export interface CustomersListResponse {
    paging: Paging
    sort: SortItem[]
    availableFilters: string[]
    appliedFilters: string[]
    Customers: CustomerWrapper[]
}
