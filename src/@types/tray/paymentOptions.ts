export interface PaymentOptionsResponse {
    PaymentOptions: PaymentOption[];
}

export interface PaymentOption {
    id: string;
    integrator_id: string;
    facilitator_id: string;
    name: string;
    image: string;
    thumbnail: string;
    additional: string;
    min_splot: string;
    max_splot: string;
    application_value: string;
    integration_code: string;
    facilitator: string;
    text: string;
    text_pag: string;
    text_confirm: string;
    finalize_action: string;
    card: string;
    discount_value: string;
    increase_value: string;
    plots: { [key: string]: Plot };
    increase: string;
    display_increase: string;
    deactivate: string;
    total_base: string;
    tax_value: string;
    is_intermediator: string;
    interest_formula: string;
    equivalent: string[];
}

export interface Plot {
    value: string;
    interest: string;
    interest_value: string;
    discount_value: string;
    increase_value: string;
    base_value: string;
    order_total: string;
    order_subtotal: string;
    specific_discount: string;
}