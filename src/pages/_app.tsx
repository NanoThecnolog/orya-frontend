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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const currentPath = router.pathname
  const asPath = router.asPath
  const [isReady, setIsReady] = useState(false)

  const winePaths = [
    "/",
  ]
  const winePrefixes = [
    "/collections/",
    "/categories/",
  ]

  const showWineFontColor =
    winePaths.includes(currentPath) ||
    winePrefixes.some(prefix => asPath.startsWith(prefix))

  useEffect(() => {
    const handleStart = () => {
      setIsReady(false)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
      setTimeout(() => setIsReady(true), 100)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    setIsReady(true)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router.events])


  return <MainProvider>

    <CartSidebar />
    <AnimatePresence mode="wait" initial={false}>
      {

        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .5, ease: "easeInOut" }}
        >
          <Header useWine={showWineFontColor} />
          <Component {...pageProps} />
        </motion.div>
      }
      <ToastContainer autoClose={3500} position="top-left" />
      <Footer />

    </AnimatePresence>
  </MainProvider>
}
