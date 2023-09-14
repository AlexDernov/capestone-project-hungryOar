import LocationsList from "../../components/LocationsList";
import {useSession } from "next-auth/react";

export default function LocationsListPage({ data, onToggleLiked, locationsInfo}) {
  const visibleData = data.filter((visibleLocation) => visibleLocation.visible === true)
  const { data: session } = useSession()
  return <LocationsList data={visibleData} onToggleLiked={onToggleLiked} locationsInfo={locationsInfo} session={session}/>;
}
