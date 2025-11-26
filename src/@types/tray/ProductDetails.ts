import { MetaTag, PaymentOptionDetail, ProductImage } from "./products";

export interface ProductDetails {
    Product: Details
}
export interface Details {
    ean: string;
    modified: string;
    is_kit: string;
    slug: string;
    ncm: string;
    activation_date: string;
    deactivation_date: string;
    deactivation_status_history: string;
    id: string;
    name: string;
    title: string;
    description: string;
    description_small: string;
    price: string;
    cost_price: string;
    dollar_cost_price: string;
    promotional_price: string;
    start_promotion: string;
    end_promotion: string;
    brand: string;
    brand_id: string;
    model: string;
    weight: string;
    length: string;
    width: string;
    height: string;
    stock: string;
    category_id: string;
    category_name: string;
    available: string;
    available_in_store: string;
    availability: string;
    reference: string;
    hot: string;
    release: string;
    additional_button: string;
    has_variation: string;
    kit_has_variation: string;
    id_campaign: string;
    has_acceptance_terms: string;
    has_buy_together: string;
    additional_message: string;
    warranty: string;
    rating: string;
    count_rating: string;
    quantity_sold: string;
    ProductImage: ProductImage[];
    image: string;
    url: ProductUrl;
    created: string;
    Properties: any[];
    payment_option: string;
    payment_option_details: PaymentOptionDetail[];
    related_categories: any[];
    release_date: string;
    shortcut: string;
    virtual_product: string;
    minimum_stock: string;
    minimum_stock_alert: string;
    promotion_id: string;
    included_items: string;
    related_products: any[];
    free_shipping: string;
    current_price: string;
    ipi: string;
    acceptance_term_option: string;
    acceptance_term: string;
    warranty_days: string;
    availability_days: string;
    cubic_weight: string;
    video: string;
    metatag: MetaTag[];
    payment_option_html: string;
    percentage_discount: string;
    upon_request: string;
    available_for_purchase: string;
    all_categories: string[];
    AdditionalInfos: any[];
    minimum_price: string;
    promotional_minimum_price: string;
    variant_without_price: string;
    variant_without_promotional_price: string;
    Variant: any[];
    tax_group: any[];
}

export interface ProductUrl {
    http: string;
    https: string;
}