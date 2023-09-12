import styled from "styled-components";
import LocationPreviewCard from "@/components/LocationPreviewCard";
import Heading from "@/components/Heading";
import TitleSection from "@/components/TitleSection";
import Head from "next/head";
import LogInOutButton from "../LogInOutButton";

export default function LocationsList({ data, onToggleLiked, locationsInfo, favoritePage, session}) {
  return (
    <>
      <Head> 
        <title>Locations</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <TitleSection> {favoritePage? <Heading>Favorite Locations</Heading>:
        <Heading>Locations</Heading>}
        <LogInOutButton session={session}/>
      </TitleSection>
      <StyledUl>
      {data.length == 0 ? <Par>You don&apos;t have any favorite locations yet</Par> :
        data?.map((location) => (
          <LocationPreviewCard
            key={location._id}
            id={location._id}
            name={location.name}
            addresse={location.location}
            bild={location.bild}
            onToggleLiked={() => onToggleLiked(location?._id)}
            isLiked={
              locationsInfo.find((locI) => locI.id === location._id)?.isLiked
            }
          />
          ))}
      </StyledUl>
    </>
  );
}
const StyledUl = styled.ul`
  padding: 0;
  margin-top: 80px;
  margin-bottom: 105px;
  margin-left: 10px;
  display: grid;
  grid-template-columns: 375px;
  gap: 1rem;
  list-style-type: none;
`;
const Par =styled.p`
height: 90vh;
width: auto;
padding-top: 30px;
padding-left: 10px;
color: grey`;
