import styled from "styled-components";
import Link from "next/link";
import Heading from "../Heading";
import Image from "next/image";
import TitleSection from "../TitleSection";



const StyledArticle = styled.article`
  background-color: rgba(255, 255, 255, 0.6);
  margin-top: 80px;
  margin-bottom: 90px;
  height: 100%;
  line-height: 120%;
  padding: 10px;
`;
const NavLink = styled(Link)`
  margin-bottom: 20px;
  margin-left: 0;
  text-decoration: none;
  color: var(--primary-color);
  text-shadow: 4px 4px 4px black;
  height: 4px;
  &: hover {
    font-size: 1.2em;
  }
`;
const StyledArtSection = styled.section`
  margin: 10px;
  padding-left: 27px;
  padding-right: 27px;
  display: grid;
  grid-template-columns: 71px 71px 71px 71px;
  row-gap: 20px;
  column-gap: 0;
  position: center;
`;
const StyledDiv = styled.div`
  text-align: center;
`;

export default function LocationDetails({
  name,
  addresse,
  zeit,
  art,
  verleih,
  bild,
}) {
  return (
    <>
      <TitleSection>
        <Heading>{name}</Heading>
      </TitleSection>
      <StyledArticle>
        <NavLink href="/locations"> ← Back</NavLink>
        <StyledDiv>
          <p>{addresse}</p>
          <p>{zeit}</p>
          <StyledArtSection>
            {art?.map((artStück) =>
              artStück === "Cafe" ? (
                <Image key={1} src="/images/CafeIcon.svg" width={71} height={45} alt="Cafe icon"/>
              ) : artStück === "Restaurant" ? (
                <Image key={2} src="/images/RestaurantIcon.svg" width={71} height={44} alt="Restaurant-icon"/>
              ) : artStück === "Bar" ? (
                <Image key={3} src="/images/BarIcon.svg" width={57} height={44} alt="Bar-icon"/>
              ) : artStück === "Kuchen" ? (
                <Image key={4} src="/images/KuchenIcon.svg" width={71} height={44} alt="Kuchen-icon"/>
              ) : artStück === "Eis" ? (
                <Image key={5} src="/images/EisIcon.svg" width={57} height={45} alt="Eis-icon"/>
              ) : artStück === "Snacks" ? (
                <Image key={6} src="/images/SnacksIcon.svg" width={71} height={44} alt="Snacks-icon"/>
              ) : (
                []
              )
            )}
          </StyledArtSection>
          <p>{verleih}</p>
          <Image src={bild} height={62} width={350} alt={name} />
        </StyledDiv>
      </StyledArticle>
    </>
  );
}
