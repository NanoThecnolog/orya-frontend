import { CollectionsComponentProps, CollectionsProps } from "@/@types/collections";

export const collection: CollectionsProps = {
    name: "Ondyne",
    image: "/img/ORYA 16510.jpg"
}

export const collections: CollectionsComponentProps[] = [
    {
        title: "Parisienne",
        description: "Vo, quasdam ves bon te ne hosternum iampris, strum ublicendam ommoviris et; noca; et poris ses",
        page: "/parisienne",
        images: [
            "/img/ORYA 16398.jpg",
            "/img/ORYA 16543.jpg",
        ]
    },
    {
        title: "Ondyne",
        description: "Vo, quasdam ves bon te ne hosternum iampris, strum ublicendam ommoviris et; noca; et poris ses",
        page: "/ondyne",
        images: [
            "/img/ORYA 16521.jpg",
            "/img/ORYA 16462.jpg",
        ]
    },
]