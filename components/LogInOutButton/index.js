import { signIn, signOut } from "next-auth/react";
import styled from "styled-components";

export default function LogInOutButton({session}) {
    console.log(session)
 
  if (session) {
    return (
      <StyledLoginContainer>
        {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </StyledLoginContainer>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
const StyledLoginContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 5px;
  font-size: 0.8rem;
  padding: 0.5rem;
`;