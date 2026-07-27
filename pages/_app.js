import "../styles/globals.scss";
// import "antd/dist/antd.css";
import { El_Messiri } from "next/font/google";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ClearStorage from "../components/common/ClearStorage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import PerformanceMonitor from "../components/common/PerformanceMonitor";
import SEO from "../components/SEO";
import { persistor, store } from "../redux/store";
import "../styles/_homepage.scss";
import "../styles/_ketchen.scss";
import "../styles/_sideBar.scss";
import "../styles/pages/_products.scss";
import Layout from "./../components/layouts/index";

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-el-messiri",
});

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const content = (
    <div className={elMessiri.variable}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SEO />

        {!isMounted ? (
          content
        ) : (
          <PersistGate loading={null} persistor={persistor}>
            <ClearStorage />

            <PerformanceMonitor />

            {content}
          </PersistGate>
        )}
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
