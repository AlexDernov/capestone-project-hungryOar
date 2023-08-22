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
  overflow: scroll;
`;
const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  border-radius: 0.5rem;
  overflow: scroll;
`;
export default function NotesForm({ text, onSubmit, title, isEditMode }) {
  return (
    <FormContainer onSubmit={onSubmit}>
      <p>{isEditMode ? "Edit the Note:" : "Add a Note"} </p>
      <label htmlFor="title"> Title:</label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={title}
        required
        minlengh="3"
        maxlengh="50"
        pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
      />
      <label htmlFor="note"> Note: </label>
      <TextArea
        type="text"
        id="note"
        name="text"
        defaultValue={text}
        required
        minlengh="3"
        max="160"
        maxlengh="200"
        pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
      />
      <button type="submit">Save</button>
    </FormContainer>
  );
}
