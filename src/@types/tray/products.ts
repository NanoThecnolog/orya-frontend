export interface ProductListResponse {
    paging: {
        total: number;
        page: number;
        offset: number;
        limit: number;
        maxLimit: number;
    };
    sort: Array<Record<string, string>>;
    availableFilters: string[];
    appliedFilters: any[];
    Products: Array<{
        Product: Product;
    }>;
}
export interface Product {
    modified: string;
    ean: string;
    is_kit: string;
    slug: string;
    ncm: string;
    activation_date: string;
    deactivation_date: string;
    deactivation_status_history: string;
    id: string;
    name: string;
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
    available: string;
    available_in_store: string;
    availability: string;
    reference: string;
    hot: string;
    release: string;
    additional_button: string;
    has_variation: string;
    rating: string;
    count_rating: string;
    quantity_sold: string;
    url: {
        http: string;
        https: string;
    };
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
    free_shipping: string;
    video: string;
    metatag: MetaTag[];
    payment_option_html: string;
    upon_request: string;
    available_for_purchase: string;
    all_categories: string[];
    AdditionalInfos: any[];
    minimum_price: string;
    promotional_minimum_price: string;
    variant_without_price: string;
    variant_without_promotional_price: string;
    ProductImage: ProductImage[];
    id_campaign: string;
    kit_has_variation: string;
    Variant: any[];
}
export interface PaymentOptionDetail {
    display_name: string;
    type: string;
    plots: string;
    value: string;
    tax: string;
}

export interface MetaTag {
    type: string;
    content: string;
}

export interface ProductImage {
    http: string;
    https: string;
    thumbs: {
        30: Thumb,
        90: Thumb,
        180: Thumb
    };
}

export interface Thumb {
    http: string;
    https: string;
}

export interface Attributes {
    pt: string
}
export interface Values {
    pt: string
}

export interface LocaleText {
    pt: string
}

export interface Variant {
    id: number
    image_id: number | null
    product_id: number
    position: number
    price: string | null
    compare_at_price: string | null
    promotional_price: string | null
    stock_management: boolean
    stock: number | null
    weight: string
    width: string
    height: string
    depth: string
    sku: string | null
    values: Values[]
    barcode: string | null
    mpn: string | null
    age_group: string | null
    gender: string | null
    created_at: string
    updated_at: string
    cost: string | null
    visible: boolean
    inventory_levels: InventoryLevel[]
}

export interface InventoryLevel {
    id: number
    variant_id: number
    location_id: string
    stock: number | null
}

/*export interface ProductImage {
    id: number
    product_id: number
    src: string
    position: number
    alt: string[]
    height: number
    width: number
    thumbnails_generated: number
    created_at: string
    updated_at: string
}*/

export interface CategoryProduct {
    id: number
    name: LocaleText
    description: LocaleText
    handle: LocaleText
    parent: number | null
    subcategories: string[]
    seo_title: LocaleText
    seo_description: LocaleText
    google_shopping_category: string
    created_at: string
    updated_at: string
}

export type ProductList = Product[]
