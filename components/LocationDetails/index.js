import styled from "styled-components";
import Link from "next/link";
import Heading from "../Heading";
import Image from "next/image";
import TitleSection from "../TitleSection";
import NotesForm from "../NotesForm";
import Note from "../Note";
import FavoriteButton from "../FavoriteButton";
import LogInOutButton from "../LogInOutButton";
import EditMode from "../EditMode";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import Map from "../Map";

export default function LocationDetails({
  data,
  mutate,
  onToggleLiked,
  isLiked,
  session,
  id,
  menu,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const isAdmin = session?.user.name === "HungryOar";
  const [detailsPage, setDetailsPage] = useState(false);

  console.log("Menu", menu);
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
        {isEditMode === false && isAdmin ? (
          <ButtonEdit onClick={handleOnEditMode}>Edit Mode</ButtonEdit>
        ) : null}
        <br />
        {isEditMode ? (
          <EditMode
            data={data}
            bild={data?.bild}
            handleOnEditMode={handleOnEditMode}
            mutate={mutate}
          />
        ) : (
          <>
            <Div>
              <NavLink href="/locations"> ← Back</NavLink>
              <br />
              <button type="button" onClick={handleOnDetailsPage}>
                {detailsPage ? "Map verstecken" : "Map anzeigen"}
              </button>
            </Div>
            {detailsPage && <Map dataOne={data} detailsPage={detailsPage} />}
            <StyledDiv>
              <Options>
                <H2>Adresse: </H2>
                <br />
                <P>{data?.location}</P>
                <H2>Öffnungszeiten: </H2>
                <br />
                <P>{data?.zeit}</P>
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
            </StyledDiv>
            <NotesForm locData={data} onSubmit={handleSubmit} />
            <StyledUl>
              <H2>Your notes:</H2>
              {data?.notes.length > 0 &&
                data?.notes?.map((note) => (
                  <Note
                    key={note._id}
                    note={note}
                    locatData={data}
                    mutate={mutate}
                  />
                ))}
            </StyledUl>
          </>
        )}
      </StyledArticle>
    </>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: space-between;

  width: 359px;
`;

const StyledArticle = styled.article`
  background-color: rgba(255, 255, 255, 0.6);
  margin-top: 110px;
  margin-bottom: 90px;
  position: relativ;
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
  margin-left: 0px;
  padding-left: 0px;
  padding-right: 27px;
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
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 5px;
  display: grid;
  grid-template-columns: 375px;
  gap: 1rem;
  list-style-type: none;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 10px;
`;

const OptionsP = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
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
const ButtonEdit = styled.button`
  position: fixed;
  right: 20px;
  top: 55px;
`;
