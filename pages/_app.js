import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Planno App</title>
          <link rel="icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer/>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
