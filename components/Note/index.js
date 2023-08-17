import styled from "styled-components";
import useSWR from "swr";
import { useState } from "react";
import NotesForm from "../NotesForm";

const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.6);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

export default function Note({ note }) {
  const { mutate } = useSWR(`/api/notes/${note?._id}`);
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
    }
  }
  return (
    <StyledListItem>
      <p>{note.title}</p> <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
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
      <button>Delete</button>
    </StyledListItem>
  );
}
