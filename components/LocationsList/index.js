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
            id={location._id}
            name={location.name}
            addresse={location.location}
            bild={location.bild}

          />
          /* <StyledListItem key={location._id}>
                    <StyledDiv>
                    <StyledName>{location.name}</StyledName> 
                    <StyledH2Div>
                    <StyledAddresse>{location.location}</StyledAddresse>
                    </StyledH2Div>
                    </StyledDiv>
                    <StyledImgDiv>
                    <StyledImage src={location.bild.img} width={location.bild.width} height={location.bild.height} alt="Bild"/>
                    </StyledImgDiv>
                    <div><p></p></div>
                </StyledListItem> */
        ))}
      </StyledUl>
    </>
  );
}
