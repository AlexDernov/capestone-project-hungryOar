import LocationDetails from "@/components/LocationDetails";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import {useSession } from "next-auth/react";
import FavoriteButton from "@/components/FavoriteButton";
import LogInOutButton from "@/components/LogInOutButton";
import TitleSection from "@/components/TitleSection";
import Heading from "@/components/Heading";

export default function LocationDetailsPage({ onToggleLiked, locationsInfo}) {
  const { data: session } = useSession();
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
            id={data?.id}
            name={data?.name}
          />
        </Heading>
        <LogInOutButton session={session} />
      </TitleSection>
      <LocationDetails
        data={data}
        name={data?.name}
        menu={data?.art}
        id={data?._id}
        mutate={mutate}
        onToggleLiked={() => onToggleLiked(data?._id)}
        session={session}
        isLiked={locationsInfo.find((locI) => locI.id === data?._id)?.isLiked}
      />
    </>
  );
}
