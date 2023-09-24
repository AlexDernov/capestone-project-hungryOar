import styled from "styled-components";
import { StyledColorButton } from "../StyledColorButton";

export default function MessagesForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const messageData = Object.fromEntries(formData);
    onSubmit(messageData);
  }
  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledP>
        Here you can share your feedback, suggestions and criticism about this
        app and its content with us.
      </StyledP>
      <Label htmlFor="name"> Your Name (optional):</Label>
      <Input
        type="text"
        id="name"
        name="name"
        minlengh="3"
        maxlengh="50"
        pattern="[0-9A-Za-zß-üА-Яа-яЁё?\s]+"
      />
      <Label htmlFor="text"> Your message: </Label>
      <TextArea
        type="text"
        id="text"
        name="text"
        required
        minlengh="3"
        max="60"
        maxlengh="600"
        pattern="[0-9A-Za-zß-üА-Яа-яЁё?\s]+"
      />
      <DivButton>
        <StyledColorButton type="submit" name="Save">
          Save
        </StyledColorButton>
      </DivButton>
    </FormContainer>
  );
}
const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 10px;
  width: 365px;
  padding-left: 10px;
  padding-bottom: 350px;
`;
const DivButton = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  font-family: Roboto Slab;
  font-size: 18px;
  border-radius: 0.5rem;
  overflow: scroll;
`;
const StyledP = styled.p`
  padding-top: 20px;
  color: var(--primary-color);
  background-size: cover, contain;
  text-shadow: 3px 3px 6px black;
  font-size: 16px;
`;
const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  font-family: Roboto Slab;
  font-size: 18px;
  font-style: oblique;
  height: 200px;
  border-radius: 0.5rem;
  overflow: scroll;
`;
const Label = styled.label`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  padding: 0;
`;
