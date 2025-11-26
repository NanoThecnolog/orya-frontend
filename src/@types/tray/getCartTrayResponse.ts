export interface CartTrayResponse {
    Cart: Cart;
}

export interface Cart {
    session_id: string;
    email: string;
    customer_id: string;
    point_sale: string;
    previous_url: string;
    progressive_discount: string;
    shipping_progressive_discount: string;
    coupon_discount: string;
    order_discount: string;
    use_taxes: string;
    Products: CartTrayProduct[];
    previous_products: any[];
    date: Date;
    hour: string;
    Store: Store;
    Coupon: any[];
    cart_additional_values_total: string;
    CartAdditionalValues: any[];
    Extensions: any[];
    partner_id: string;
    partner_name: string;
    tax_name: string;
    Tax: Tax;
    total: string;
    sub_total: string;
}

export interface CartTrayProduct {
    id: string;
    quantity: string;
    price: string;
    variant_id: string;
    additional_information: string;
    name: string;
    date: Date;
    bought_together_id: string;
    cart_id: string;
    text_variant: string;
    id_campaign: string;
    is_giveaways: string;
    PaymentMethodByProduct: any[];
    id_item: string;
    Category: Category;
    ProductImage: any[];
    url: URL;
    ncm: string;
    stock: string;
    ean: string;
    reference: string;
    original_name: string;
    available: string;
    brand: string;
    Variant: any[];
    is_giveaway_by_coupon: string;
    intermediated: string;
    price_itens_kit: string;
    can_be_wrapped: string;
    has_wrap_available: string;
    Tax: any[];
    sub_total: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface URL {
    http: string;
    https: string;
}

export interface Store {
    id: string;
    name: string;
    url: string;
}

export interface Tax {
    name: string;
    value: string;
    isB2B: string;
}