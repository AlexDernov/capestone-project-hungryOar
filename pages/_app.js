import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import useSWR from "swr";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR("/api/locations", fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }

  return (
    <>
      <GlobalStyle />

      <Head>
        <title>Capstone Project</title>
      </Head>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} data={data} />
        </Layout>
      </SWRConfig>
    </>
  );
}
