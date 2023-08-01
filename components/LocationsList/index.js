import styled from "styled-components";
import LocationPreviewCard from "@/components/LocationPreviewCard";

const StyledUl = styled.ul`
  padding: 1px;
  margin: 5px;
  display: grid;
  grid-template-columns: 438px;
  gap: 1rem;
  list-style-type: none;
  background-color: blau;
`;

export default function LocationsList({ data }) {
  console.log("LocData", data);

  return (
    <>
      <StyledUl>
        {data?.map((location) => (
          <LocationPreviewCard
          key={location._id}
            id={location._id}
            name={location.name}
            addresse={location.location}
            bild={location.bild}

          />
        ))}
      </StyledUl>
    </>
  );
}
