import { MenuProps } from "@/@types/Menu";

export const menu: MenuProps[] = [
    {
        title: "coleções",
        dropMenu: [
            {
                title: "Parisienne",
                link: "/collections/collection/parisienne",
            },
            {
                title: "Ondyne",
                link: "/collections/collection/ondyne",
            },
            {
                title: "Francines",
                link: "/collections/collection/francines",
            },
        ],
    },
    {
        title: "categorias",
        dropMenu: [
            {
                title: "brincos",
                link: "/category/brincos"
            },
            {
                title: "pulseiras",
                link: "/category/pulseiras"
            },
            {
                title: "anéis",
                link: "/category/aneis"
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