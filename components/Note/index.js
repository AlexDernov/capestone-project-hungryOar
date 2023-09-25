import styled from "styled-components";
import { useState } from "react";
import NotesForm from "../NotesForm";
import { useRouter } from "next/router";
import { StyledColorButtonKl } from "../StyledColorButton";

export default function Note({ note, locatData, mutate }) {
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);

  async function handleEditNote(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noteData = Object.fromEntries(formData);

    const response = await fetch(`/api/notes/${note?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    if (response.ok) {
      mutate();
      setIsEditMode(false);
    }
  }
  async function handleDeleteNote() {
    const responseNote = await fetch(`/api/notes/${note?._id}`, {
      method: "DELETE",
    });
    if (!responseNote.ok) {
      return <h1>Something gone wrong!</h1>;
    }

    if (responseNote.ok) {
      const responseLocation = await fetch(`/api/locations/${locatData?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: locatData?.notes.filter((oneNote) => {
            return oneNote._id == note._id ? false : true;
          }),
        }),
      });
      if (responseLocation.ok) {
        mutate();
        router.push(`/locations/${locatData?._id}`);
      }
    }
  }

  return (
    <StyledListItem>
      <H2>{note.title}</H2>
      <StyledDate>Von: {new Date(note.createdAt).toLocaleString()}</StyledDate>
      <P>{note.text}</P>
      <div>
        {isEditMode && (
          <NotesForm
            onSubmit={handleEditNote}
            title={note.title}
            text={note.text}
            isEditMode={true}
          />
        )}
      </div>
      <DivButton>
        {!isEditMode ? (
          <StyledStyledColorButtonKl
            type="button"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            Edit
          </StyledStyledColorButtonKl>
        ) : null}
        {!isEditMode ? (
          <StyledStyledColorButtonKl type="button" onClick={handleDeleteNote}>
            Delete
          </StyledStyledColorButtonKl>
        ) : (
          <StyledStyledColorButtonKl
            type="button"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            Cancel
          </StyledStyledColorButtonKl>
        )}
      </DivButton>
    </StyledListItem>
  );
}
const StyledStyledColorButtonKl =styled(StyledColorButtonKl)`
margin-bottom:10px;
margin-top:5px;
`;
const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  padding-left: 10px;
  padding-right: 10px;
  margin-left:0;
  margin-right: 5px;
  margin-top: 10px;
  width: 345px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const DivButton = styled.div`
  width: 330px;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-left: 0;
  justify-content: space-around;
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
  
  margin-bottom: 0;
  padding: 0;
`;
const StyledDate = styled.p`
  margin: 0;
  padding: 10px 10px 10px 0;
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