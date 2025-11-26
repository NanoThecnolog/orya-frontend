export interface ShippingCotation {
    zipcode: string,
    products: {
        product_id: number,
        price: number,
        quantity: number
    }[]
}

export interface ShippingCotationResponse {
    Shipping: Shipping;
}

export interface Shipping {
    destination: Destination;
    origin: Destination;
    cotation: Cotation[];
}

export interface Cotation {
    id: string;
    id_quotation: string;
    name: string;
    integrator: string;
    identifier: string;
    value: string;
    min_period: string;
    max_period: string;
    estimated_delivery_date: string;
    information: string;
    taxe: Taxe;
    tracking_url: string;
    running_days: string;
    pickup: string;
    pickup_options: any[];
}

export interface Taxe {
    name: string;
    value: string;
}

export interface Destination {
    zipcode: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
}
