import "../styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "../components/Layouts/RootLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
