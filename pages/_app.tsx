import "../styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "../components/Layouts/RootLayout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Head>
        <title>Techspire</title>
        <meta
          name="description"
          content="The premier technology event by Software Development Society."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
