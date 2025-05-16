import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer/>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
