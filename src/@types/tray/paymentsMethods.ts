export interface Image {
    url: string;
    secure_url: string;
}

export interface Thumbnail {
    url: string;
    secure_url: string;
}

export interface Integrator {
    id: string;
    identifier: string;
    group: string;
    subgroup: string;
    broker: string;
    method: string;
    action: string;
    redirection: string;
}

export interface Fields {
    card_digits?: string;
    card_security_digits?: string;
    [key: string]: any; // permite campos variáveis da API
}

export interface PaymentMethod {
    id: string;
    display_name: string;
    operator_name: string;
    identifier: string;
    status: string;
    image: Image;
    thumbnail: Thumbnail;
    max_plots: string;
    differentiated_discount: string;
    facilitator: string;
    code_integration: string;
    Facilitator: any[]; // conforme seu retorno atual
    Integrator: Integrator;
    fields?: Fields | Record<string, any>;
}

export interface PaymentMethodsGroup {
    credit: PaymentMethod[];
    order: PaymentMethod[];
}

export interface PaymentMethodsResponse {
    PaymentMethods: PaymentMethodsGroup;
}
