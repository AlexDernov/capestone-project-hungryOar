import styled from "styled-components";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import EditMode from "../EditMode";

export default function NewLocationPreviewCard({
  name,
  addresse,
  bild,
  id,
  zeit,
  verleiOpt,
  mutate,
  verleih,
  visible,
  data,
  menuType
}) {
    const [isEditMode, setIsEditMode] = useState(false);
    function handleOnEditMode() {
        setIsEditMode(!isEditMode);
      }
      async function handleOnTakeOver(){
        const approved = {visible: true}
        const response = await fetch(`/api/locations/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          });
          if (response.ok) {
            mutate();
            handleOnEditMode(approved);
          }
      }
  return (
    <>
      <StyledListItem>
      {isEditMode === false ? (<>
          <button onClick={handleOnEditMode}>Edit Mode</button>
          <button onClick={handleOnTakeOver}>Übernehmen in die Hauptliste</button></>
        ) : null}
        <br />
        {isEditMode ? (
          <EditMode
            data={data}
            bild={bild}
            handleOnEditMode={handleOnEditMode}
            mutate={mutate}
          />
        ) : (
          <>
        <Div>
            <StyledDiv>
              <StyledName>{name}</StyledName>
              <StyledPDiv>
                <StyledAddresse>{addresse}</StyledAddresse>
                <p>{zeit}</p>
              </StyledPDiv>
              <StyledArtSection>
                {menuType?.map((artStück) =>
                  artStück === "Cafe" ? (
                    <Image
                      key={1}
                      src="/images/CafeIcon.svg"
                      width={71}
                      height={45}
                      alt="Cafe icon"
                    />
                  ) : artStück === "Restaurant" ? (
                    <Image
                      key={2}
                      src="/images/RestaurantIcon.svg"
                      width={71}
                      height={44}
                      alt="Restaurant-icon"
                    />
                  ) : artStück === "Bar" ? (
                    <Image
                      key={3}
                      src="/images/BarIcon.svg"
                      width={57}
                      height={44}
                      alt="Bar-icon"
                    />
                  ) : artStück === "Kuchen" ? (
                    <Image
                      key={4}
                      src="/images/KuchenIcon.svg"
                      width={71}
                      height={44}
                      alt="Kuchen-icon"
                    />
                  ) : artStück === "Eis" ? (
                    <Image
                      key={5}
                      src="/images/EisIcon.svg"
                      width={57}
                      height={45}
                      alt="Eis-icon"
                    />
                  ) : artStück === "Snacks" ? (
                    <Image
                      key={6}
                      src="/images/SnacksIcon.svg"
                      width={71}
                      height={44}
                      alt="Snacks-icon"
                    />
                  ) : (
                    []
                  )
                )}
              </StyledArtSection>
              <p>{verleih}</p>
              <CldImage
                src={bild?.img}
                height={300}
                width={350}
                crop="fill"
                gravity="auto"
                alt={name}
              />
              <br />
            </StyledDiv>
        </Div>
        </> )} 
      
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
