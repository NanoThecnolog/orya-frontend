interface Shipping {
    id_shipping: string;
    name: string;
    min_period: string;
    max_period: string;
    zip_code: string;
    price: string;
    tax_name: string;
    tax_value: string;
    city: string;
    state: string;
}

export interface CartDataProps {
    session_id: string;
    product_id: number;
    variant_id?: number;
    quantity: number;
    price?: number;
    additional_information?: string;
    Shipping?: Shipping;
}
export interface CartCreateServiceProps {
    session_id: string,
    products: CartProduct[]
}
export interface CartProduct {
    product_id: string,
    quantity: string | number
}
