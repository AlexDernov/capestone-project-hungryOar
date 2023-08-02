import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import Heading from "../components/Heading";
import Map from "../components/Map";

const StyledP =styled.p`
color: var(--primary-color);
height: auto;
width: 369px;
text-align:center`;

const NavLink = styled(Link)`
margin-left: 90px;
text-decoration: none;
color: rgb(251, 172, 252);
border-color: black;
height: 200px;



&: hover {
  font-size: 1.2em;
  margin-left: 70px;
}
}`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Capstone Project</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <main>
        <Heading>Hungry Oar</Heading>
      </main>
      <NavLink href="/locations">Zu der Liste von Locations</NavLink>
      <StyledP>
        In this application you will find places in Hamburg where you can eat
        and drink without leaving (or almost without leaving) a boat, kayak,
        sap, etc. and get all the information you need about them.
      </StyledP>
      <Link href="/locations">
       <Map/>
      </Link>
    </>
  );
}

