export interface StoreInfo {
    id: number
    name: LocaleText
    description: LocaleNullableText
    type: string | null
    email: string
    logo: string
    contact_email: string | null
    country: string
    facebook: string | null
    twitter: string | null
    instagram: string | null
    pinterest: string | null
    blog: string | null
    business_id: string
    business_name: string
    business_address: string
    address: string | null
    phone: string | null
    whatsapp_phone_number: string | null
    customer_accounts: 'optional' | 'required' | 'disabled'
    plan_name: string
    domains: string[]
    languages: Languages
    original_domain: string
    url_with_protocol: string
    main_currency: string
    current_theme: string
    main_language: string
    admin_language: string
    created_at: string
    updated_at: string
}

export interface LocaleText {
    pt: string
}

export interface LocaleNullableText {
    pt: string | null
}

export interface Languages {
    es: LanguageConfig
    pt: LanguageConfig
    en: LanguageConfig
}

export interface LanguageConfig {
    currency: string
    active: boolean
}
