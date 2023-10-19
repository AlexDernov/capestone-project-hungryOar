import LocationDetails from "@/components/LocationDetails";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import {useSession } from "next-auth/react";
import FavoriteButton from "@/components/FavoriteButton";
import LogInOutButton from "@/components/LogInOutButton";
import TitleSection from "@/components/TitleSection";
import Heading from "@/components/Heading";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";


/* 
export async function getServerSideProps(context) {
  const session = await getServerSession(context.request, context.response, authOptions)
const isAdmin = session?.user.name === "HungryOar";

  return {
    props: {
      isAdmin,
    },
  }
} */
export default function LocationDetailsPage({ onToggleLiked, locationsInfo,/*  isAdmin} */}) {
  const { data: session } = useSession();
  const isAdmin = session?.user.name === "HungryOar";
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error, mutate } = useSWR(`/api/locations/${id}`);
  if (error) <p>Error!</p>;
  if (!isLoading) <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <TitleSection>
        <Heading>
          {data?.name}
          <FavoriteButton
            onToggleLiked={onToggleLiked}
            isLiked={locationsInfo.find((locI) => locI.id === data?._id)?.isLiked}
            id={data?._id}
            name={data?.name}
           
          />
        </Heading>
        <LogInOutButton session={session}  isAdmin={isAdmin}/>
      </TitleSection>
      <LocationDetails
        data={data}
        name={data?.name}
        menu={data?.art}
        id={data?._id}
        mutate={mutate}
        onToggleLiked={() => onToggleLiked(data?._id)}
        isLiked={locationsInfo.find((locI) => locI.id === data?._id)?.isLiked}
        locationsInfo={locationsInfo}
        isAdmin={isAdmin}
      />
    </>
  );
}
