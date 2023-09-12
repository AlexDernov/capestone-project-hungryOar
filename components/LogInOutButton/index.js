import { signIn, signOut } from "next-auth/react";
import styled from "styled-components";

export default function LogInOutButton({session, admin}) {
  
    console.log(session)
 
  if (session) {
    return (
      <StyledLoginContainer>{admin? "Admin":
        session.user.name}<br />
        <button onClick={() => signOut()}>Log out</button>
      </StyledLoginContainer>
    )
  }
  return (
    <StyledLoginContainer>
        <br />

      <button onClick={() => signIn()}>Log in</button>
    </StyledLoginContainer>
  )
}
const StyledLoginContainer = styled.div`
  position: fixed;
  top: 0px;
  right: 5px;
  font-size: 0.8rem;
  padding: 0;
  margin-right:15px 
`;