import LocationDetails from "@/components/LocationDetails";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function LocationDetailsPage({ onToggleLiked, locationsInfo }) {
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
      <LocationDetails
        data={data}
        mutate={mutate}
        onToggleLiked={() => onToggleLiked(data?._id)}
        isLiked={locationsInfo.find((locI) => locI.id === data?._id)?.isLiked}
      />
    </>
  );
}
