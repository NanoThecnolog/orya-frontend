export interface CategoryProps {
    name: string,
    image: string
    position?: string
}

export interface CategoryList {
    Category: Category;
}

export interface Category {
    id: string;
    parent_id: string;
    name: string;
    small_description: string;
    Images: Image[];
}

export interface Image {
    http: string;
    https: string;
}