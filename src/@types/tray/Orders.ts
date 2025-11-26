export interface OrderWrap {
    Order: OrderProps
}
export interface OrderProps {
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
    shipping_cancelled: string;
    store_note: string;
    customer_note: string;
    partner_id: string;
    discount_coupon: string;
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
    payment_date: Date;
    access_code: string;
    shipment_integrator: string;
    modified: Date;
    printed: string;
    interest: string;
    id_quotation: string;
    estimated_delivery_date: Date;
    is_traceable: string;
    external_code: string;
    tracking_url: string;
    has_payment: string;
    has_shipment: string;
    has_invoice: string;
    dc_id: string;
    total_comission_user: string;
    total_comission: string;
    OrderStatus: OrderStatus;
    PickupLocation: any[];
    ProductsSold: ProductsSold[];
    Payment: any[];
    OrderInvoice: any[];
    MlOrder: any[];
    OrderTransactions: OrderTransaction[];
    MarketplaceOrder: any[];
    Extensions: any[];
    CustomerAddress: CustomerAddress;
    ShippingLabel: ShippingLabel;
    payments_notification: PaymentsNotification;
    partner_name: string;
}
export interface CustomerAddress {
    id: string;
}

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
}

export interface OrderTransaction {
    url_payment: string;
}

export interface ShippingLabel {
    application: string;
    url: string;
}

export interface PaymentsNotification {
    notification: string;
}

export interface ProductsSold {
    id: string,
    is_giveaway_by_coupon: string
}