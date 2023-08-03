import styled from "styled-components";
import LocationPreviewCard from "@/components/LocationPreviewCard";
import Heading from "@/components/Heading";
import Divider from "../Divider";
import NavBar from "../NavigationsBar";

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 375px;
  gap: 1rem;
  list-style-type: none;
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
      <Heading>Locations</Heading>
      <Divider/>
      <NavBar/>
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
