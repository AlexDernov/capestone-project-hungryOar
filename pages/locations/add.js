import AddLocation from "@/components/AddLocation";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import {useSession } from "next-auth/react";
import TitleSection from "../../components/TitleSection";
import Heading from "../../components/Heading";
import LogInOutButton from "../../components/LogInOutButton";
import styled from "styled-components";

export default function AddPage() {
  const { data: session } = useSession();


  return (
    <>
      <Head>
        <title>Add new location</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <TitleSection>
        <Heading>
          Add new location
        </Heading>
        <LogInOutButton session={session} />
      </TitleSection>
      <StyledArticle>
      <AddLocation session={session}
      />
       </StyledArticle>
    </>
  );
}
const StyledArticle = styled.article`
  background-color: rgba(255, 255, 255, 0.6);
  margin-top: 80px;
  margin-bottom: 90px;
  height: 100%;
  line-height: 120%;
  padding: 10px;
`;