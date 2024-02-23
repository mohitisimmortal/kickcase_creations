import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserWrapper from "@/components/UserWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from "recoil";
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <UserWrapper>
        <ToastContainer theme="dark" position="top-right" autoClose={3000} />
          <main className={inter.className}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </main>
        </UserWrapper>
      </RecoilRoot>
    </>
  )
}
