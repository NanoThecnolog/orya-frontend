import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const currentPath = router.pathname

  const showWineFontColor = currentPath !== "/"
  return <>
    <Header useWine={showWineFontColor} />
    <Component {...pageProps} />
    <Footer />
  </>;
}
