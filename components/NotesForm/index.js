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
export default function NotesForm({ text, onSubmit, title, isEditMode }) {
  return (
    <FormContainer onSubmit={onSubmit}>
      <p>{isEditMode ? "Edit the Note:" : "Add a Note"} </p>
      <label htmlFor="title"> Title:</label>
      <Input type="text" id="title" name="title" defaultValue={title} required pattern="[A-Za-zА-Яа-яЁё]+$"/>
      <label htmlFor="note"> Note: </label>
      <Input type="text" id="note" name="text" defaultValue={text} required/>
      <button type="submit">Save</button>
    </FormContainer>
  );
}
