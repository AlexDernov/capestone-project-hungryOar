import Head from "next/head";
import styled from "styled-components";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const NavLink = styled(Link)`
text-decoration: none;
color: white;
border-color: black;
align: center;
&: hover {
  font-size: 1.2em;}

&: target {
  color: red;
  font-size: 1.2em;
}`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Capstone Project</title>
        <meta name="description" content="Penguin Capstone Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Heading>🐧Penguin Capstone Template🐧</Heading>
      </main>
      <NavLink id="Locations List" href="/locations">Zu der List von Locations</NavLink>
    </>
  );
}

const Heading = styled.h1`
  text-align: center;
`;
