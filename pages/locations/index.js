import LocationsList from "../../components/LocationsList";
export default function LocationsListPage({ data, onToggleLiked, locationsInfo}) {
  return <LocationsList data={data} onToggleLiked={onToggleLiked} locationsInfo={locationsInfo}/>;
}
