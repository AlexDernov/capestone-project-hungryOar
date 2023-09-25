import styled from "styled-components";
import { StyledColorButton } from "../StyledColorButton";

export default function NotesForm({ text, onSubmit, title, isEditMode }) {
  return (
    <FormContainer onSubmit={onSubmit}>
      <H2>{isEditMode ? "Edit the Note:" : "Add a Note"} </H2>
      <Label htmlFor="title"> Title:</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={title}
        required
        minlengh="3"
        maxlengh="50"
        pattern="[0-9A-Za-zß-üА-Яа-яЁё?\s]+"
      />
      <Label htmlFor="note"> Note: </Label>
      <TextArea
        type="text"
        id="note"
        name="text"
        defaultValue={text}
        required
        minlengh="3"
        max="160"
        maxlengh="200"
        pattern="[0-9A-Za-zß-üА-Яа-яЁё?\s]+"
      />
      <DivButton>
      <StyledColorButton  type="submit">Save</StyledColorButton>
      </DivButton>
    </FormContainer>
  );
}



const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  width: 100%;
`;
const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  font-family: Roboto Slab;
  font-size: 18px;
  border-radius: 0.5rem;
  width:330px;
  overflow: scroll;
`;
const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: inherit;
  font-family: Roboto Slab;
  font-size: 18px;
  font-style: oblique;
  border: 1px solid grey;
  width:330px;
  border-radius: 0.5rem;
  overflow: scroll;
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
`;

const Label = styled.label`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 0;
  padding: 0;
`;
const DivButton = styled.div`
  width: 330px;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-left: 0;
  justify-content: space-around;
`;