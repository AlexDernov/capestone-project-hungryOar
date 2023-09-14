import LocationsList from "../components/LocationsList";
import Head from "next/head.js";
import useSWR from "swr";
import { useState } from "react";
import {useSession } from "next-auth/react";


export default function newLocationsPage() {
  const { data: session } = useSession() 
  const { data, isLoading, error } = useSWR("/api/locations");
  const [newLocationPage, setNewLocationPage] = useState(true);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }

  const newLocations = data.filter((location) => location.visible===false
  );
  return (
    <div>
      <Head>
        <title>new Locations</title>
      </Head>
      <LocationsList
        data={newLocations}
        newLocationPage={newLocationPage}
        session={session}
      />
    </div>
  );
}
