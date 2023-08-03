import styled from "styled-components";
import LocationPreviewCard from "@/components/LocationPreviewCard";

const StyledUl = styled.ul`
  padding: 1px;
  margin: 5px;
  display: grid;
  grid-template-columns: 438px;
  gap: 1rem;
  list-style-type: none;
  background-color: var(--primary-color-back);
`;
const StyledTitle = styled.h1`
  color: white;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  padding: 0;
`;

export default function LocationsList({ data }) {
  console.log("LocData", data);

  return (
    <>
      <StyledTitle>Locations</StyledTitle>
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
