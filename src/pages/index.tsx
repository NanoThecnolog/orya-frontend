import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Carousel from "@/components/Carousel";
import { carouselImages } from "@/common/variables/carouselImages";
import CarouselProducts from "@/components/CarouselProducts";
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
import { ProductList } from "@/@types/nuvemshop/products";
import { GetServerSideProps } from "next";
import { useMain } from "@/contexts/mainContext";

interface HomeProps {
  products: ProductList | null
}

export default function Home() {
  const [products, setProducts] = useState<ProductList>([])
  const { productList, setProductList } = useMain()



  /*const testeAPI = async () => {
    try {
      const response = await axios.get<StoreInfo>("/api/store")
      const data = response.data
      //console.log("resultado da request de teste", data)
    } catch (err) {
      console.error("erro na request de teste", err)
    }
  }*/
  const getProducts = async () => {
    try {
      const response = await axios.get<ProductList>("/api/products")
      const data = response.data
      console.log("resultado da request de produtos", data)
      setProductList(data)
    } catch (err) {
      console.error("erro na request de produtos", err)
    }
  }
  useEffect(() => {
    //testeAPI()
    if (productList.length === 0) getProducts()
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
        <CarouselProducts products={productList} text={true} />
        <BannerCollection collection={collection} />
        <Categories categories={categories} />
        <CarouselProducts2 products={productList} />
        <TextDivisor />
        <Banner image="/img/ORYA 16550.png" />
        <About />
      </main>
    </>
  );
}

/*export const getServerSideProps: GetServerSideProps = async () => {
  const url = process.env.OFFICIAL_URL

  try {
    const response = await axios.get<ProductList>(`${url}/api/products`)
    const data = response.data
    console.log("resultado da request de produtos", data)
    return {
      props: { products: data }
    }
  } catch (err) {
    console.error("erro na request de produtos", err)
    return {
      props: { products: null }
    }
  }
}*/