import LocationsList from "../components/LocationsList";
import Head from "next/head.js";
import useSWR from "swr";
import { useState } from "react";
import {useSession } from "next-auth/react";
import LogInOutButton from "../components/LogInOutButton";


export default function FavoriteLocationsPage({
  locationsInfo,
  onToggleLiked
}) {
  const { data: session } = useSession() 
  const { data, isLoading, error } = useSWR("/api/locations");
  const [favoritePage, setFavoritePage] = useState(true);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }

  const favorites = data.filter((location) =>
    locationsInfo.find(
      (locI) => locI.id == location._id && locI.isLiked == true
    )
  );
  return (
    <div>
      <Head>
        <title>Locations - Favorites</title><LogInOutButton session={session}/>
      </Head>
      <LocationsList
        data={favorites}
        onToggleLiked={onToggleLiked}
        locationsInfo={locationsInfo} 
        favoritePage={favoritePage}
        session={session}
      />
    </div>
  );
}
