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
  const asPath = router.asPath

  const winePaths = [
    "/",
  ]
  const winePrefixes = [
    "/collections/collection/",
  ]

  const showWineFontColor =
    winePaths.includes(currentPath) ||
    winePrefixes.some(prefix => asPath.startsWith(prefix))
  return <>
    <Header useWine={showWineFontColor} />
    <Component {...pageProps} />
    <Footer />
  </>;
}
