import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import Heading from "../components/Heading";
import Map from "../components/Map";
import NavBar from "../components/NavigationsBar";
import Divider from "../components/Divider";

const StyledP = styled.p`
  margin: 0;
  padding: 0;
  color: var(--primary-color);
  background-size: cover, contain;
  text-shadow: 3px 3px 6px black;
  text-align: center;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;

const StyledSecrion = styled.section``;
export default function Home() {
  return (
    <>
      <Head>
        <title>Capstone Project</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <StyledMain>
        <StyledSecrion>
          <Heading>Hungry Oar</Heading>
          <Divider />
          <NavBar />
        </StyledSecrion>
        <StyledP>
          In this application you will find places in Hamburg where you can eat
          and drink without leaving (or almost without leaving) a boat, kayak,
          sap, etc. and get all the information you need about them.
        </StyledP>
        <Link href="/locations">
          <Map />
        </Link>
      </StyledMain>
    </>
  );
}
