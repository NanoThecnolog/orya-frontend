export interface CustomerAddressResponse {
    CustomerAddress: CustomerAddress;
}

export interface CustomerAddress {
    id: string;
    customer_id: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    type: string;
    active: string;
    description: string;
    recipient: string;
    type_delivery: string;
    not_list: string;
}