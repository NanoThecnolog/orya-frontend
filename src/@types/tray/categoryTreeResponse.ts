export interface CategoryTreeResponse {
    Category: Category[];
}

export interface ChildCategory {
    slug: string;
    id: string;
    parent_id: string;
    name: string;
    description: string;
    title: string;
    small_description: string;
    link: Link;
    images: Link[];
    has_product: string;
    children: Category[] | null;
}

export interface Category {
    Category: ChildCategory;
}

export interface Link {
    http: string;
    https: string;
}