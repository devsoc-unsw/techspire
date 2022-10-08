import "../styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "../components/Layouts/RootLayout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Head>
        <title>CSESoc Techspire 2022</title>
        <meta
          name="description"
          content="The premier technology event from the largest computer science society in the southern hemisphere."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
