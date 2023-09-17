import LocationsList from "../../components/LocationsList";
import {useSession } from "next-auth/react";
import Head from "next/head";
import NewLocationsList from "../../components/LocationsList"

export default function LocationsListPage({ data, onToggleLiked, locationsInfo, mutate}) {
  const isAdmin = session?.user.name === "HungryOar";
  conct [newList, setNewList] = useState(false);
  function handleNewList(){
setNewList(!newList);
  }
  const { data: session } = useSession()
  const visibleData = data.filter((visibleLocation) => visibleLocation.visible === true)
  const hiddenData = data.filter((visibleLocation) => visibleLocation.visible === false)
  return <>
  <Head> 
        <title>Locations</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      {isAdmin? <button type="button" onClick={handleNewList}>{newList? "Veröffentlichte Liste":"New Location"} </button> :null}
      {newList? <NewLocationsList data={hiddenData} session={session} isAdmin={isAdmin} mutate={mutate}/>:
 <LocationsList data={visibleData} onToggleLiked={onToggleLiked} locationsInfo={locationsInfo} session={session}/>}
 </>
}
