import LocationsList from "../../components/LocationsList";
import {useSession } from "next-auth/react";
import Head from "next/head";
import NewLocationsList from "../../components/NewLocationsList";
import Loading from "../../components/NewLocationsList";

/* export function getServerSideProps(){
  const isAdmin = session?.user.name === "HungryOar";
} */

export default function LocationsListPage({ /* isAdmin, */ onToggleLiked, locationsInfo}) {
 const { data: session } = useSession()
  const isAdmin = session?.user.name === "HungryOar";
  const [newList, setNewList] = useState(false);

 
 
 
  
  const { data, isLoading, error, mutate } = useSWR("/api/locations");

  if (isLoading) {
    return <Loading/>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }
  console.log("Data from locPages", data);

  const visibleData = data.filter((visibleLocation) => visibleLocation.visible === true)
  const hiddenData = data.filter((visibleLocation) => visibleLocation.visible === false)

  function handleNewList(){
    setNewList(!newList);
      }
  console.log("Data visible", visibleData);
  console.log("Data hidden", hiddenData);
  return <>
  <Head> 
        <title>Locations</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      {isAdmin? <button type="button" onClick={handleNewList}>{newList? "New Location":"Veröffentlichte Liste"} </button> :null}
      {newList? <NewLocationsList data={hiddenData} session={session} isAdmin={isAdmin} mutate={mutate}/>:
 <LocationsList data={visibleData} onToggleLiked={onToggleLiked} locationsInfo={locationsInfo} session={session}/>}
 </>
}
