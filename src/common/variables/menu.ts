import { MenuProps } from "@/@types/Menu";

export const menu: MenuProps[] = [
    {
        title: "coleções",
        dropMenu: [
            {
                title: "Parisienne",
                link: "/collections/parisienne",
            },
            {
                title: "Ondyne",
                link: "/collections/ondyne",
            },
            {
                title: "Francines",
                link: "/collections/francines",
            },
        ],
    },
    {
        title: "categorias",
        dropMenu: [
            {
                title: "brincos",
                link: "/categories/category/brincos"
            },
            {
                title: "pulseiras",
                link: "/categories/category/pulseiras"
            },
            {
                title: "anéis",
                link: "/categories/category/aneis"
            }
        ]
    },
    {
        title: "linhas",
        dropMenu: [
            {
                title: "linha 1",
                link: "/line/linha-1"
            },
            {
                title: "linha 2",
                link: "/line/linha-2"
            },
            {
                title: "linha 3",
                link: "/line/linha-3"
            }
        ]
    },
    {
        title: "onde encontrar",
        link: "/contact",
    },
    {
        title: "sobre",
        link: "/about",
    },
]