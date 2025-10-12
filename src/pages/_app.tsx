import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { MainProvider } from "@/contexts/mainContext";
import CartSidebar from "@/components/CartSideBar";

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

  return <MainProvider>
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .5, ease: "easeInOut" }}
      >
        <Header useWine={showWineFontColor} />
        <CartSidebar />
        <Component {...pageProps} />
        <Footer />
      </motion.div>
    </AnimatePresence>
  </MainProvider>
}
