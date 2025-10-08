import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Carousel from "@/components/Carousel";
import { carouselImages } from "@/common/variables/carouselImages";
import CarouselProducts from "@/components/CarouselProducts";
import { products } from "@/common/variables/products";
import BannerCollection from "@/components/BannerCollection";
import { collection } from "@/common/variables/collections";
import Categories from "@/components/Categories";
import { categories } from "@/common/variables/categories";
import CarouselProducts2 from "@/components/CarouselProducts2";

export default function Home() {
  return (
    <>
      <Head>
        <title>Loja Oryá</title>
        <meta name="description" content="Loja de joias online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <Carousel images={carouselImages} autoplay={false} />
        <CarouselProducts products={products} text={true} />
        <BannerCollection collection={collection} />
        <Categories categories={categories} />
        <CarouselProducts2 products={products} />
      </main>
    </>
  );
}
