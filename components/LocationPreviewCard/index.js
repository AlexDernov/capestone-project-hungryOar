import styled from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import { CldImage } from "next-cloudinary";

export default function LocationPreviewCard({
  name,
  addresse,
  bild,
  id,
  onToggleLiked,
  isLiked,
  newLocationPage,
}) {
  return (
    <>
      <StyledListItem>
        <Div>
          <NavLink href={`/locations/${id}`}>
            <StyledDiv>
              <StyledName>{name}</StyledName>
              <StyledPDiv>
                <StyledAddresse>{addresse}</StyledAddresse>
              </StyledPDiv>
            </StyledDiv>
          </NavLink>
          {newLocationPage ? null : (
            <FavoriteButton
              onToggleLiked={onToggleLiked}
              isLiked={isLiked}
              id={id}
            />
          )}
        </Div>
        <NavLink href={`/locations/${id}`}>
          <StyledImgDiv>
            <StyledImage
              src={bild?.img}
              height={100}
              width={350}
              crop="fill"
              gravity="auto"
              alt={name}
            />
          </StyledImgDiv>
        </NavLink>
      </StyledListItem>
    </>
  );
}

const StyledImage = styled(CldImage)`
max-width: 100% 
height: auto
mode: thumb
padding: 10px;
margin: 0;
justify-content: center;
`;
const StyledImgDiv = styled.div`
max-width: 100%
margin: 10px;
padding-left: 13px;
display: grid;
align-self: center;
height: 105px
`;
const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-content: center;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
`;
const Div = styled.div`
  position: relativ;
  display: flex;
  flex-direction: row;
  align-content: space-around;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
`;
const StyledName = styled.h2`
  color: #373636;
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
const StyledAddresse = styled.p`
  margin: 0;
  padding: 10px;
  color: #040404;
  text-align: right 10px;
  text-shadow: 1px 1px 2px 0px #fff;
  font-family: Roboto Slab;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.2px;
  position: relativ;
  right: 0;
  top: 10px;
`;
const StyledPDiv = styled.div`
margin: 0;
width = 30%;
align-self: flex-end;
align: right`;
const NavLink = styled(Link)`
  text-decoration: none;
  &: hover {
    font-size: 1.2em;
  }
`;
