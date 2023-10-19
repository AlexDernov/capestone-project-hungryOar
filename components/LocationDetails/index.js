import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import NotesForm from "../NotesForm";
import Note from "../Note";
import EditMode from "../EditMode";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import Map from "../Map";
import { StyledColorButton, StyledColorButtonKl } from "../StyledColorButton";

export default function LocationDetails({
  data,
  mutate,
  isLiked,
  id,
  menu,
  locationsInfo,
  isAdmin
}) {
  const [isEditMode, setIsEditMode] = useState(false);
/*   const isAdmin = session?.user.name === "HungryOar"; */
  const [detailsPage, setDetailsPage] = useState(false);

  function handleOnEditMode() {
    setIsEditMode(!isEditMode);
  }

  function handleOnDetailsPage() {
    setDetailsPage(!detailsPage);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noteData = Object.fromEntries(formData);

    const responseNote = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (responseNote.ok) {
      const locData = await responseNote.json();
      const responseLocation = await fetch(`/api/locations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: [locData.data._id, ...data?.notes],
        }),
      });
      if (responseLocation.ok) {
        mutate();
        event.target.reset();
      }
    }
  }

  return (
    <>
      <StyledArticle>
        {isEditMode ? (
          <EditMode
            data={data}
            bild={data?.bild}
            handleOnEditMode={handleOnEditMode}
            mutate={mutate}
            isAdmin={isAdmin}
          />
        ) : (
          <>
            <NavLink href="/locations"> ← Back</NavLink>
            <DivButton>
              {isEditMode === false && isAdmin ? (
                <StyledColorButtonKl onClick={handleOnEditMode}>
                  Edit Mode
                </StyledColorButtonKl>
              ) : null}
              <br />
              <NewStyledColorButton type="button" onClick={handleOnDetailsPage}>
                {detailsPage ? "Map verstecken" : "Map anzeigen"}
              </NewStyledColorButton>
            </DivButton>
            <br />
            {detailsPage && (
              <StyledMap
                data={[data]}
                detailsPage={detailsPage}
                isLiked={isLiked}
                locationsInfo={locationsInfo}
              />
            )}
            <StyledDiv>
              <Options>
                <H2>Adresse: </H2>
                <br />
                <P>{data?.location}</P>
                <H2>Öffnungszeiten: </H2>
                <br />
                <P>{data?.zeit}</P>
                <Div>
                <StyledArtSection>
                  <OptionsP>Was gibt&apos;s:</OptionsP>
                  {menu?.map((artStück) =>
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
                </Div>
                <br />
                <H2> Was kann man ausleihen:</H2> <br />
                <P>
                  {data?.verleih === "-" || ""
                    ? "Leider, kein Verleih möglich"
                    : data?.verleih}
                </P>
              </Options>
              <CldImage
                src={data?.bild.img}
                height={300}
                width={350}
                crop="fill"
                gravity="auto"
                alt={data?.name}
              />
              <br />
              <DivForm>
                <NotesForm locData={data} onSubmit={handleSubmit} />
                <StyledUl>
                  <H2>Your notes:</H2>
                  {data?.notes.length > 0 ? (
                    data?.notes?.map((note) => (
                      <Note
                        key={note._id}
                        note={note}
                        locatData={data}
                        mutate={mutate}
                      />
                    ))
                  ) : (
                    <StyledListItem>
                      <P>You don&apos;t have any notes yet</P>
                    </StyledListItem>
                  )}
                </StyledUl>
              </DivForm>
            </StyledDiv>
          </>
        )}
      </StyledArticle>
    </>
  );
}
const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 0;
  margin-right: 5px;
  margin-top: 10px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  justify-content: center;
  align-items: center;
`;

const NewStyledColorButton = styled(StyledColorButton)`
  margin-top: 5px;
`;

const StyledArticle = styled.article`
  background-color: rgba(255, 255, 255, 0.6);
  position: relativ;
  height: auto;
  width: 80%
  line-height: 120%;
  margin-top: 88px;
  padding-top: 50px;
  margin-bottom: 90px;
`;
const Div = styled.div`
display: flex;
justify-content: center`;

const NavLink = styled(Link)`
  margin-bottom: 0;
  margin-left: 20px;
  text-decoration: none;
  color: var(--primary-color);
  text-shadow: 6px 2px 6px black;
  font-family: Roboto Slab;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 3.25px;
  height: 4px;
  &: hover {
    font-size: 1.2em;
  }
`;
const StyledMap = styled(Map)`
  display: ${({ detailsPage }) => (detailsPage ? "block" : "none")};
`;

const StyledArtSection = styled.section`
  display: grid;
  grid-template-columns: 71px 71px 71px 71px;
  row-gap: 20px;
  column-gap: 0;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const StyledUl = styled.ul`
  padding: 0;
  margin: 20px 0 20px 0;
  
  display: flex;
  flex-direction: column;
  width: 345px;
  justify-content: center;
  list-style-type: none;
`;

const Options = styled.div`
  display: flex;
  width: 345px;
  flex-direction: column;
  align-content: center;
  padding-left:5px;
  padding-right:10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const OptionsP = styled.p`
  margin: 10px 0 0 15px;
  padding: 0;
  color: #040404;
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  grid-row: 1 / span3;
  grid-column: 1 / span2;
`;
const P = styled.p`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 0;
  padding: 0;
  font-style: oblique;
`;
const H2 = styled.p`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 0;
  padding: 0;
  font-weight: bold;
`;

const DivButton = styled.div`
  padding-top: 10px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
