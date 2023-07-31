import GlobalStyle from "@/styles";
import Head from "next/head";
import {SWRConfig} from "swr";
import useSWR from "swr"
import styled from "styled-components";

const StyledDiv =styled.section`
width: 450px;
margin: 0;
padding: 0;
background-color: blue;
display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;`;

export default function App({ Component, pageProps }) {
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }
    return response.json();
  };
  const { data, isLoading, error} = useSWR("api/locations", fetcher);
  /* const {data, isLoading} = useSWR("api/locations"); */

  if(isLoading) {
      return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
      return <h1>Data cannot be loaded.</h1>
  }
  console.log(data)
  return (
    <>
      <GlobalStyle />
      <StyledDiv>
      <Head>
        <title>Capstone Project</title>
      </Head>
      <SWRConfig value ={{fetcher}}>
      <Component {...pageProps} data={data} />
      </SWRConfig>
      </StyledDiv>
    </>
  );
}
