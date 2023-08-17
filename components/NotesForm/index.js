import useSWR from "swr";
import styled from "styled-components";


const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;
const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  border-radius: 0.5rem;
`;
export default function NotesForm({ locData, onSubmit, text, title, isEditMode}) {
  const { mutate } = useSWR(`/api/locations/${locData?._id}`);

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
      const data = await responseNote.json();
      console.log("Undif", data);
      const responseLocation = await fetch(`/api/locations/${locData?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notes: [...locData?.notes, data.data._id],
        }),
      });
      if (responseLocation.ok) {
        mutate();
      }
    }
  }
  return (
    
    <FormContainer onSubmit={handleSubmit}>
      <p>{isEditMode ? "Edit the Note:" : "Add a Note"} </p>
      <label htmlFor="title"> Title:</label>
        <Input type="text" id="title" name="title" defaultValue={title} />
      <label htmlFor="note"> Note: </label>
        <Input type="text" id="text" name="text" defaultValue={text} />
        <button type="submit">Save</button> 
    </FormContainer>
  );
}
