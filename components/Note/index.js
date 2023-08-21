import styled from "styled-components";
import { useState } from "react";
import NotesForm from "../NotesForm";
import { useRouter } from "next/router";

const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

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
      <p>{note.title}</p>{" "}
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
      {!isEditMode ? (
        <button
          type="button"
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          Edit
        </button>
      ) : null}
      {!isEditMode ? (
        <button type="button" onClick={handleDeleteNote}>
          Delete
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          Cancel
        </button>
      )}
    </StyledListItem>
  );
}
