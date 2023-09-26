import LocationsList from "../../components/LocationsList";
import {useSession } from "next-auth/react";
import Head from "next/head";
import NewLocationsList from "../../components/NewLocationsList";
import Loading from "../../components/NewLocationsList";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import {StyledColorButton} from "../../components/StyledColorButton";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.request, context.response, authOptions)
const isAdmin = session?.user.name === "HungryOar";

  return {
    props: {
      isAdmin,
    },
  }
}
export default function LocationsListPage({  onToggleLiked, locationsInfo, noRental, setNoRental, isAdmin}) {
 const { data: session } = useSession()
  
  const [newList, setNewList] = useState(false);
  const { data, isLoading, error, mutate } = useSWR("/api/locations");

  if (isLoading) {
    return <Loading/>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>Data cannot be loaded.</h1>;
  }

  const visibleData = data.filter((visibleLocation) => visibleLocation.visible === true)
  const hiddenData = data.filter((visibleLocation) => visibleLocation.visible === false)

  function handleNewList(){
    setNewList(!newList);
      }
  return <>
  <Head> 
        <title>Locations</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <DivPage>
        {isAdmin?
     <DivButton><StyledButton type="button" onClick={handleNewList}>{newList? "Veröffentlichte Liste":"Suggested Locations"} </StyledButton></DivButton>: null}
      {newList? <NewLocationsList isAdmin={isAdmin} data={hiddenData} session={session} mutate={mutate}  noRental={noRental} setNoRental={setNoRental}/>:
 <LocationsList data={visibleData} isAdmin={isAdmin} onToggleLiked={onToggleLiked} locationsInfo={locationsInfo} session={session}/>}
 </DivPage>
 </>
}
const StyledButton = styled(StyledColorButton)`
margin-top: 76px`;

const DivPage = styled.div`
display: flex;
flex-direction: column;
align-items: center;`;

const DivButton = styled.div`
  width: 360px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left:0;
  justify-content: space-around;
`;
