import styled from "styled-components";

export default function MessagesForm({ onSubmit}) {
  return (
    <FormContainer onSubmit={onSubmit}>
        <p>Contact us!</p>
      <p>Here you can share your feedback, suggestions and criticism about this app and its content with us.</p>
      <label htmlFor="name"> Your Name (optional):</label>
      <Input
        type="text"
        id="name"
        name="name"
        minlengh="3"
        maxlengh="50"
        pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
      />
      <label htmlFor="text"> Your message: </label>
      <TextArea
        type="text"
        id="text"
        name="text"
        required
        minlengh="3"
        max="460"
        maxlengh="200"
        pattern="[0-9A-Za-zА-Яа-яЁё?\s]+"
      />
      <button type="submit">Save</button>
    </FormContainer>
  );
}
const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 10px;
  padding-bottom: 350px
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