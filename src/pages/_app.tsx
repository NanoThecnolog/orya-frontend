import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.scss";
import styles from "../styles/Home.module.scss"
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
import WhatsappButton from "@/components/ui/WhatsappButton";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const currentPath = router.pathname
  const asPath = router.asPath
  const [isReady, setIsReady] = useState(false)

  const isConstrucao = currentPath === '/construcao'

  const winePaths = [
    "/",
  ]
  const winePrefixes = [
    "/collections/",
    "/categories/",
    "/line"
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

    {!isConstrucao && <CartSidebar />}
    {
      !isConstrucao && <Header useWine={showWineFontColor} />
    }

    <div className={styles.mainContainer} style={{ opacity: isReady ? 1 : 0, backgroundColor: 'beige' }}>
      <AnimatePresence mode="wait" initial={false}>
        {
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5, ease: "easeInOut" }}
          >

            <Component {...pageProps} />
          </motion.div>
        }
      </AnimatePresence>
      {
        !isConstrucao &&
        <>
          <ToastContainer autoClose={3500} position="top-left" />
          <Footer />
          <WhatsappButton />
        </>
      }
    </div>
  </MainProvider>
}
