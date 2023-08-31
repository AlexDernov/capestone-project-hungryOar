import GlobalStyle from "@/styles";
import Head from "next/head";
import { SWRConfig } from "swr";
import useSWR from "swr";
import Layout from "../components/Layout";
import { useImmerLocalStorageState } from "../lib/hook/useImmerLocalStorageState";

export default function App({ Component, pageProps }) {
  const [locationsInfo, updateLocationsInfo] = useImmerLocalStorageState(
    "locationsInfo",
    { defaultValue: [] }
  );
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR("/api/locations", fetcher);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }
  function handleToggleLiked(id) {
    updateLocationsInfo((draft) => {
      const location = draft.find((location) => location.id === id);
      if (location) {
        location.isLiked = !location.isLiked;
      } else {
        draft.push({ id, isLiked: true });
      }
    });
  }
  return (
    <>
      <GlobalStyle />

      <Head>
        <title>Capstone Project</title>
      </Head>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component
            {...pageProps}
            data={data}
            onToggleLiked={handleToggleLiked}
            locationsInfo={locationsInfo}
          />
        </Layout>
      </SWRConfig>
    </>
  );
}
