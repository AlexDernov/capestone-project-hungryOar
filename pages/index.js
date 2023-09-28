import Head from "next/head";
import styled from "styled-components";
import Heading from "../components/Heading";
import Map from "../components/Map";
import TitleSection from "../components/TitleSection";
import useSWR from "swr";
import LogInOutButton from "../components/LogInOutButton";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

/* export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
const isAdmin = session?.user.name === "HungryOar";

  return {
    props: {
      isAdmin,
    },
/*   }
} */


export async function getServerSideProps( context ) {

  const session = await getServerSession( context?.req, context?.res,  authOptions);
  const isAdmin = session?.user.name === "HungryOar";
 
  return { props: { isAdmin } };
}
 
export default function Home({ locationsInfo /* , isAdmin  */}) {
  const { data: session } = useSession();
  const isAdmin = session?.user.name === "HungryOar";
  const { data, isLoading, error } = useSWR("/api/locations");
  const visibleData = data.filter(
    (visibleLocation) => visibleLocation.visible === true
  );
  if (isLoading) {
    return <Loading />;
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
          <LogInOutButton session={session} isAdmin={isAdmin} />
        </TitleSection>
        <StyledP>
          In this app you will find locations in Hamburg where you can eat and
          drink without leaving (or hardly leaving) your boat, kayak, SAP, etc.
          and get all the information you need about these places.
        </StyledP>
        <Map locationsInfo={locationsInfo} data={visibleData} />
      </StyledMain>
    </>
  );
}

const StyledP = styled.p`
  margin-top: 60px;
  padding: 15px;
  padding-top: 15px;
  color: var(--primary-color);
  background-size: cover, contain;
  text-shadow: 3px 3px 6px black;
  text-align: center;
  font-size: 16px;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;
