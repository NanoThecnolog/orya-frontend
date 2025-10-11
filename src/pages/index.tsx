import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Carousel from "@/components/Carousel";
import { carouselImages } from "@/common/variables/carouselImages";
import CarouselProducts from "@/components/CarouselProducts";
//import { products } from "@/common/variables/products";
import BannerCollection from "@/components/BannerCollection";
import { collection } from "@/common/variables/collections";
import Categories from "@/components/Categories";
import { categories } from "@/common/variables/categories";
import CarouselProducts2 from "@/components/CarouselProducts2";
import TextDivisor from "@/components/TextDivisor";
import Banner from "@/components/Banner";
import About from "@/components/About";
import { useEffect, useState } from "react";
import axios from "axios";
import { StoreInfo } from "@/@types/nuvemshop/storeInfo";
import { ProductList } from "@/@types/nuvemshop/products";
//import { GetServerSideProps } from "next";
import CartSidebar from "@/components/CartSideBar";
import { useMain } from "@/contexts/mainContext";

/*interface HomeProps {
  products: ProductList | null
}*/

export default function Home() {
  const [products, setProducts] = useState<ProductList | null>(null)
  //const [cartOpen, setCartOpen] = useState<boolean>(false)


  const testeAPI = async () => {
    try {
      const response = await axios.get<StoreInfo>("/api/store")
      const data = response.data
      //console.log("resultado da request de teste", data)
    } catch (err) {
      console.error("erro na request de teste", err)
    }
  }
  const getProducts = async () => {
    try {
      const response = await axios.get<ProductList>("/api/products")
      const data = response.data
      //console.log("resultado da request de produtos", data)
      setProducts(data)
    } catch (err) {
      console.error("erro na request de produtos", err)
    }
  }
  useEffect(() => {
    testeAPI()
    getProducts()
  }, [])



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
        <TextDivisor />
        <Banner image="/img/ORYA 16550.png" />
        <About />
      </main>
    </>
  );
}

/*export const getServerSideProps: GetServerSideProps = async () => {

  try {
    const response = await axios.get<ProductList>("/api/products")
    const data = response.data
    console.log("resultado da request de teste", data)
    return {
      props: { products: data }
    }
  } catch (err) {
    console.error("erro na request de teste", err)
    return {
      props: { products: null }
    }
  }
}*/