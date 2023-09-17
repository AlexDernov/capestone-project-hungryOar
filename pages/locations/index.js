import LocationsList from "../../components/LocationsList";
import {useSession } from "next-auth/react";
import Head from "next/head";

export default function LocationsListPage({ data, onToggleLiked, locationsInfo}) {
  const visibleData = data.filter((visibleLocation) => visibleLocation.visible === true)
  const { data: session } = useSession()
  return <>
  <Head> 
        <title>Locations</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
 <LocationsList data={visibleData} onToggleLiked={onToggleLiked} locationsInfo={locationsInfo} session={session}/>
 </>
}
