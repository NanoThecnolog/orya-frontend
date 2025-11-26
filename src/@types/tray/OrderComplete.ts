export interface OrderResponseComplete {
    Order: OrderComplete;
    Extensions: any[];
    User: any[];
    Confirmation: any[];
}

/* ===========================
   ORDER
   =========================== */

export interface OrderComplete {
    status: string;
    id: string;
    date: string;
    hour: string;
    customer_id: string;
    partial_total: string;
    taxes: string;
    discount: string;
    point_sale: string;
    shipment: string;
    shipment_value: string;
    shipment_date: string;
    delivered: string;
    delivered_status: string;
    shipping_cancelled: string;
    store_note: string;
    customer_note: string;
    partner_id: string;
    discount_coupon: string;
    client_ip: string;
    payment_method_rate: string;
    installment: string;
    value_1: string;
    sending_code: string;
    sending_date: string;
    billing_address: string;
    delivery_time: string;
    payment_method_id: string;
    payment_method: string;
    session_id: string;
    total: string;
    payment_date: string;
    access_code: string;
    shipment_integrator: string;
    modified: string;
    printed: string;
    interest: string;
    cart_additional_values_discount: string;
    cart_additional_values_increase: string;
    id_quotation: string;
    estimated_delivery_date: string;
    is_traceable: string;
    external_code: string;
    tracking_url: string;
    has_payment: string;
    has_shipment: string;
    has_invoice: string;
    delivery_date: string;
    dc_id: string;
    dc_order_origin: string;
    total_comission_user: string;
    total_comission: string;

    OrderStatus: OrderStatus;
    PickupLocation: any[];
    cost: string;
    app_id: string;

    urls: OrderURLs;
    store_segment: string;
    payment_method_type: string;

    Customer: Customer;

    ProductsSold: ProductSoldWrapper[];

    OrderInvoice: any[];
    Payment: PaymentWrapper[];
    MlOrder: any[];
    MarketplaceOrder: any[];
    OrderTransactions: any[];
    OrderInvoiceAmount: any[];
    OtherInvoiceAmounts: any[];
    ExtraTabs: any[];
    OrderChilds: any[];

    DistributionCenter: DistributionCenterData;

    PaymentMethodMessage: PaymentMethodMessage;
    payments_notification: PaymentsNotification;

    partner_name: string;
}

/* ===========================
   ORDER STATUS
   =========================== */

export interface OrderStatus {
    id: string;
    default: string;
    type: string;
    show_backoffice: string;
    allow_edit_order: string;
    description: string;
    status: string;
    show_status_central: string;
    background: string;
    display_name: string;
    font_color: string;
}

/* ===========================
   URLS
   =========================== */

interface OrderURLs {
    payment: string;
}

/* ===========================
   CUSTOMER
   =========================== */

interface Customer {
    cnpj: string;
    newsletter: string;
    created: string;
    terms: string;
    id: string;
    name: string;
    registration_date: string;
    rg: string;
    cpf: string;
    phone: string;
    cellphone: string;
    birth_date: string;
    gender: string;
    email: string;
    nickname: string;
    token: string;
    total_orders: string;
    observation: string;
    type: string;
    foreign: string;
    company_name: string;
    state_inscription: string;
    reseller: string;
    discount: string;
    blocked: string;
    credit_limit: string;
    indicator_id: string;
    profile_customer_id: string;
    last_sending_newsletter: string;
    last_purchase: string;
    last_visit: string;
    last_modification: string;

    address: string;
    zip_code: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    modified: string;
    count_orders: string;

    Extensions: CustomerExtensions;
    CustomerAddresses: CustomerAddressWrapper[];
}

interface CustomerExtensions {
    Profile: CustomerProfile;
    Profiles: CustomerProfile[];
}

interface CustomerProfile {
    id: string;
    name: string;
    approves_registration: string;
    price_list_id?: string;
    show_price?: string;
    theme_id?: string;
    selected?: string;
}

interface CustomerAddressWrapper {
    CustomerAddress: CustomerAddress;
}

interface CustomerAddress {
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

/* ===========================
   PRODUCT SOLD
   =========================== */

export interface ProductSoldWrapper {
    ProductsSold: ProductSold;
}

interface ProductSold {
    product_kit_id: string;
    product_kit_id_kit: string;
    id_campaign: string;
    product_id: string;
    quantity: string;
    id: string;
    order_id: string;
    name: string;
    original_name: string;
    virtual_product: string;
    ean: string;
    availability_days: string;
    availability: string;
    Sku: any[];
    price: string;
    cost_price: string;
    original_price: string;
    weight: string;
    weight_cubic: string;
    brand: string;
    model: string;
    reference: string;
    length: string;
    width: string;
    height: string;
    variant_id: string;
    additional_information: string;
    text_variant: string;
    warranty: string;
    bought_together_id: string;
    ncm: string;
    included_items: string;
    release_date: string;
    commissioner_value: string;
    comissao: string;
    is_giveaway_by_coupon: string;

    ProductSoldImage: ProductSoldImage[];

    Category: ProductCategory[];

    is_giveaway: string;
    BoughtTogether: any[];
    ProductSoldPackage: any[];
    ProductSoldCard: any[];

    url: ProductURL;
    Discount: any[];

    Stock: ProductStock;
}

interface ProductSoldImage {
    http: string;
    https: string;
    thumbs: ProductImageThumbs;
}

interface ProductImageThumbs {
    ["30"]: ProductImageThumb;
    ["90"]: ProductImageThumb;
    ["180"]: ProductImageThumb;
}

interface ProductImageThumb {
    http: string;
    https: string;
}

interface ProductCategory {
    id: string;
    name: string;
    main_category: string;
}

interface ProductURL {
    http: string;
    https: string;
}

interface ProductStock {
    id: string;
    name: string;
}

/* ===========================
   PAYMENT
   =========================== */

interface PaymentWrapper {
    Payment: Payment;
}

interface Payment {
    created: string;
    modified: string;
    id: string;
    order_id: string;
    payment_method_id: string;
    method: string;
    payment_place: string;
    value: string;
    date: string;
    note: string;
    unique_number: string;
}

/* ===========================
   DISTRIBUTION CENTER
   =========================== */

interface DistributionCenterData {
    status: string;
    type: string;
    group_id: string;
    Package: DistributionPackage;
}

interface DistributionPackage {
    id: string;
    created_at: string;
    updated_at: string;
    order_id: string;
    DistributionCenter: DistributionCenterInfo;
    Products: DistributionProduct[];
}

interface DistributionCenterInfo {
    id: string;
    name: string;
    document: string;
    postal_code: string;
    country: string;
    state: string;
    city: string;
    address: string;
    number: string;
    neighborhood: string;
    complement: string;
    updated_at: string;
    created_at: string;
}

interface DistributionProduct {
    product_id: string;
    variant_id: string;
    product_sold_id: string;
    quantity: string;
}

/* ===========================
   PAYMENT METHOD MESSAGE
   =========================== */

interface PaymentMethodMessage {
    text: string;
    text_pag: string;
    text_confirm: string;
    confirmation: string;
}

/* ===========================
   PAYMENT NOTIFICATION
   =========================== */

interface PaymentsNotification {
    notification: string;
}