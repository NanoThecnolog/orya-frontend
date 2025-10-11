export interface Product {
    id: number
    name: LocaleText
    description: LocaleText
    handle: LocaleText
    attributes: any[]
    published: boolean
    free_shipping: boolean
    requires_shipping: boolean
    canonical_url: string
    video_url: string | null
    seo_title: LocaleText
    seo_description: LocaleText
    brand: string | null
    created_at: string
    updated_at: string
    variants: Variant[]
    tags: string
    images: ProductImage[]
    categories: Category[]
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
    values: any[]
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

export interface ProductImage {
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
}

export interface Category {
    id: number
    name: LocaleText
    description: LocaleText
    handle: LocaleText
    parent: number | null
    subcategories: any[]
    seo_title: LocaleText
    seo_description: LocaleText
    google_shopping_category: string
    created_at: string
    updated_at: string
}

export type ProductList = Product[]
