import styled from "styled-components";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import EditMode from "../EditMode";
import Image from "next/image";
import { useState } from "react";

export default function NewLocationPreviewCard({
  name,
  addresse,
  bild,
  id,
  zeit,
  mutate,
  verleih,
  visible,
  data,
  menuType,
  session,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  function handleOnEditMode() {
    setIsEditMode(!isEditMode);
  }
  console.log("Data from NewLocPreviewCard", data);
  
  async function handleOnTakeOver() {
    const approved = { visible: true };
    const response = await fetch(`/api/locations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(approved),
    });
    if (response.ok) {
      mutate();
      handleOnEditMode();
    }
  }
  return (
    <>
      <StyledListItem>
        {isEditMode === false ? (
          <>
            <button onClick={handleOnEditMode}>Edit Mode</button>
            <button onClick={handleOnTakeOver}>
              Übernehmen in die Hauptliste
            </button>
          </>
        ) : null}
        <br />
        {isEditMode ? (
          <EditMode
            data={data}
            bild={bild}
            handleOnEditMode={handleOnEditMode}
            mutate={mutate}
            session={session}
          />
        ) : (
          <>
            <Div>
              <StyledDiv>
                <StyledDivTitel>
                  <StyledName>{name}</StyledName>
                  <StyledPDiv>
                    <StyledAddresse>{addresse}</StyledAddresse>
                  </StyledPDiv>
                </StyledDivTitel>

                <Options>
                  <H2>Öffnungszeiten: </H2>
                  <br />
                  <P>{zeit}</P>
                </Options>

                <StyledArtSection>
                  <OptionsP>Was gibt's:</OptionsP>
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

                <Options>
                  <H2> Was kann man ausleihen:</H2> <br />
                  <P>
                    {verleih === "-" ? "Leider, kein Verleih möglich" : verleih}
                  </P>
                </Options>
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
          </>
        )}
      </StyledListItem>
    </>
  );
}

/* const StyledImage = styled(CldImage)`
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
`; */
const OptionsP = styled.p`
margin-top: 10px;
margin-bottom:0;
padding:0;
color: #040404;
text-align: left;
text-shadow: 2px 2px 4px 0px #fff;

font-family: Roboto Slab;
  font-size: 20px;
  grid-row: 1 / span3;
  grid-column: 1 / span2;
`;
const P = styled.p`
color: #040404;
text-align: left;
text-shadow: 2px 2px 4px 0px #fff;
font-family: Roboto Slab;
font-size: 18px;
margin-top:0;
padding:0;
font-style: oblique;
`;
const H2 = styled.p`
color: #040404;
text-align: left;
text-shadow: 2px 2px 4px 0px #fff;
font-family: Roboto Slab;
font-size: 18px;
margin-top:10px;
margin-bottom:0;
padding:0;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const StyledDivTitel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-size: 2px;
  border-bottom-style: solid;
  border-bottom-color: var(--primary-color);
`;

const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-content: center;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
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
  padding-bottom: 4px;
  color: #040404;
  text-shadow: 1px 1px 2px 0px #fff;
  font-family: Roboto Slab;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.2px;
  position: relativ;
  right: 0;
  top: 0px;
`;
const StyledPDiv = styled.div`
margin: 0;
width = 30%;
align-self: flex-end;
align: right`;

const StyledArtSection = styled.section`
  margin-top: 0px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 71px 71px 71px;
  row-gap: 20px;
  column-gap: 0;
`;
