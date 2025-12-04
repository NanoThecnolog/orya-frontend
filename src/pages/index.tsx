import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Carousel from "@/components/homeComponents/Carousel";
import { carouselImages } from "@/common/variables/carouselImages";
import CarouselProducts from "@/components/homeComponents/CarouselProducts";
import BannerCollection from "@/components/homeComponents/BannerCollection";
import { collection } from "@/common/variables/collections";
import Categories from "@/components/homeComponents/Categories";
import { categories } from "@/common/variables/categories";
import CarouselProducts2 from "@/components/homeComponents/CarouselProducts2";
import TextDivisor from "@/components/homeComponents/TextDivisor";
import Banner from "@/components/Banner";
import About from "@/components/homeComponents/About";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductList } from "@/@types/tray/products";
import { GetServerSideProps } from "next";
import { useMain } from "@/contexts/mainContext";
import { breakpoints } from "@/common/variables/swiperBreakpoint";
import { apiTray } from "@/services/classes/IntegraApi";
//import { debug } from "@/utils/DebugLogger";

interface HomeProps {
  products: ProductList
}

export default function HomePage({ products }: HomeProps) {
  const { productList, setProductList } = useMain()
  const [width, setWidth] = useState(0)
  const [cardsPerContainer, setCardsPerContainer] = useState(4)
  //console.log("produtos", products)

  useEffect(() => {
    if (!products || products.length === 0) return
    //debug.log("produtos do server", products)
    setProductList(products)
  }, [productList, products])

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      setWidth(windowWidth)
      const { cards } = breakpoints.find(b => windowWidth < b.width) || { cards: 5 }
      setCardsPerContainer(cards)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Head>
        <title>Oryá Atelier de Joias</title>
        <meta name="description" content="Joias da ORYÁ criadas para expressar personalidade, autenticidade e sofisticação. Inspirada nas raízes indígenas das fundadoras, a marca combina técnica, criatividade e significado para oferecer peças que acompanham a mulher contemporânea em cada momento importante, unindo qualidade, versatilidade e identidade própria." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <Carousel images={carouselImages} />
        <CarouselProducts products={productList} text={true} cardsPerContainer={cardsPerContainer} />
        <BannerCollection collection={collection} />
        <Categories categories={categories} />
        <CarouselProducts2 products={productList} cardsPerContainer={cardsPerContainer} />
        <TextDivisor />
        <Banner image="/img/ORYA 16467.jpg" />
        <About />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = process.env.OFFICIAL_URL

  try {
    const response = await apiTray.getProducts()
    const data = response
    //console.log("resultado da request de produtos", data)
    return {
      props: { products: data }
    }
  } catch (err) {
    console.error("erro na request de produtos", err)
    return {
      props: { products: [] }
    }
  }
}