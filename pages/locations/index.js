import LocationsList from "../../components/LocationsList";
import {useSession } from "next-auth/react";

export default function LocationsListPage({ data, onToggleLiked, locationsInfo}) {
  const { data: session } = useSession()
  return <LocationsList data={data} onToggleLiked={onToggleLiked} locationsInfo={locationsInfo} session={session}/>;
}
