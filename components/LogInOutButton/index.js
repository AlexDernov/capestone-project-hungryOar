import { signIn, signOut } from "next-auth/react";
import styled from "styled-components";

export default function LogInOutButton({ session }) {
  const isAdmin = session?.user.name === "HungryOar";

  if (session) {
    return (
      <StyledLoginContainer>
        {isAdmin ? "Admin" : session.user.name}
        <br />
        <button onClick={() => signOut()}>Log out</button>
      </StyledLoginContainer>
    );
  }
  return (
    <StyledLoginContainer>
      <br />

      <button onClick={() => signIn()}>Log in</button>
    </StyledLoginContainer>
  );
}
const StyledLoginContainer = styled.div`
  position: fixed;
  top: 2px;
  right: 5px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  margin-right: 15px;
`;
