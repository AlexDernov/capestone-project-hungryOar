import Head from "next/head";
import styled from "styled-components";
import Heading from "../components/Heading";
import Map from "../components/Map";
import TitleSection from "../components/TitleSection";
import useSWR from "swr";
import LogInOutButton from "../components/LogInOutButton";
import {useSession } from "next-auth/react";


export default function Home({ locationsInfo}) {
const { data: session } = useSession() 
const { data, isLoading, error } = useSWR("/api/locations");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }
  return (
    <>
      <Head>
        <title>Hungry Oar</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <StyledMain>
        <TitleSection>
          <Heading>Hungry Oar</Heading>
          <LogInOutButton session={session}/>
        </TitleSection>
        <StyledP>
          In this application you will find places in Hamburg where you can eat
          and drink without leaving (or almost without leaving) a boat, kayak,
          sap, etc. and get all the information you need about them.
        </StyledP>
        <Map locationsInfo={locationsInfo} data={data}/>
      </StyledMain>
    </>
  );
}

const StyledP = styled.p`
  margin-top: 80px;
  padding: 10px;
  padding-top: 25px;
  color: var(--primary-color);
  background-size: cover, contain;
  text-shadow: 3px 3px 6px black;
  text-align: center;
  font-size: 14px;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;
