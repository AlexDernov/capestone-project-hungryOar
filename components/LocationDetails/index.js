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

export default function LocationDetails({
  data,
  mutate,
  onToggleLiked,
  isLiked,
  session
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const isAdmin = session?.user.name==="HungryOar";
  function handleOnEditMode() {
    setIsEditMode(!isEditMode);
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
      const responseLocation = await fetch(`/api/locations/${data?._id}`, {
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
      <TitleSection>
        <Heading>
          {data?.name}
          <FavoriteButton
            onToggleLiked={onToggleLiked}
            isLiked={isLiked}
            id={data?._id}
          />
        </Heading>
        <LogInOutButton session={session} />
      </TitleSection>
      <StyledArticle>
       
        
        {isEditMode===false && isAdmin ?<button onClick={handleOnEditMode}>Edit Mode</button> : null}<br/>
      {isEditMode? <EditMode data={data} handleOnEditMode={handleOnEditMode} mutate={mutate}/>: <>
      <NavLink href="/locations"> ← Back</NavLink>
      <StyledDiv>
          <p>{data?.location}</p>
          <p>{data?.zeit}</p>
          <StyledArtSection>
            {data?.art?.map((artStück) =>
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
          <p>{data?.verleih}</p>
          <Image
            src={data?.bild.img}
            height={62}
            width={350}
            alt={data?.name}
          />
        </StyledDiv>
        <NotesForm locData={data} onSubmit={handleSubmit} />
        <StyledUl>
          <p>Your notes:</p>
          {data?.notes.length > 0 &&
            data?.notes?.map((note) => (
              <Note
                key={note._id}
                note={note}
                locatData={data}
                mutate={mutate}
              />
            ))}
        </StyledUl></> }
      </StyledArticle>
    </>
  );
}

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
