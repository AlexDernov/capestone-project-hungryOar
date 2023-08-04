import styled from "styled-components";
import LocationPreviewCard from "@/components/LocationPreviewCard";
import Heading from "@/components/Heading";
import TitleSection from "@/components/TitleSection";
import NavBar from "../NavigationsBar";

const StyledUl = styled.ul`
  padding: 0;
  margin-top: 80px;
  margin-bottom: 105px;
  display: grid;
  grid-template-columns: 375px;
  gap: 1rem;
  list-style-type: none;
`;

export default function LocationsList({ data }) {
  console.log("LocData", data);

  return (
    <>
      <TitleSection>
        <Heading>Locations</Heading>
      </TitleSection>
      <NavBar />
      <StyledUl>
        {data?.map((location) => (
          <LocationPreviewCard
            key={location._id}
            name={location.name}
            addresse={location.location}
            bild={location.bild}
          />
        ))}
      </StyledUl>
    </>
  );
}
