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
      <p>{note.title}</p>
      <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
      <p>{note.text}</p>
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
          <StyledColorButtonKl
            type="button"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            Edit
          </StyledColorButtonKl>
        ) : null}
        {!isEditMode ? (
          <StyledColorButtonKl type="button" onClick={handleDeleteNote}>
            Delete
          </StyledColorButtonKl>
        ) : (
          <StyledColorButtonKl
            type="button"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            Cancel
          </StyledColorButtonKl>
        )}
      </DivButton>
    </StyledListItem>
  );
}
const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  padding-left: 10px;
  padding-right: 10px;
  margin-left:0;
  margin-right: 5px;
  margin-top: 10px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DivButton = styled.div`
  width: 360px;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-left: 0;
  justify-content: space-around;
`;
