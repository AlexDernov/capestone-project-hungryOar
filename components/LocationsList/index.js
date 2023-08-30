import styled from "styled-components";
import LocationPreviewCard from "@/components/LocationPreviewCard";
import Heading from "@/components/Heading";
import TitleSection from "@/components/TitleSection";
import Head from "next/head";

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

export default function LocationsList({ data, onToggleLiked, locationsInfo }) {
  return (
    <>
      <Head>
        <title>Locations</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <TitleSection>
        <Heading>Locations</Heading>
      </TitleSection>
      <StyledUl>
        {data?.map((location) => (
          <LocationPreviewCard
            key={location._id}
            id={location._id}
            name={location.name}
            addresse={location.location}
            bild={location.bild}
            onToggleLiked={()=> onToggleLiked(location?._id)}
            isLiked={locationsInfo.find((locI)=>locI.id===location._id)?.isLiked} />
        ))}
      </StyledUl>
    </>
  );
}
