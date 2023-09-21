import { signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import {StyledLogIn} from "../StyledColorButton";

export default function LogInOutButton({ session }) {
  const isAdmin = session?.user.name === "HungryOar";

  if (session) {
    return (
      <StyledLoginContainer><P>
        {isAdmin ? "Admin" : session.user.name}</P>
        <br />
        <StyledLogIn onClick={() => signOut()}>Log out</StyledLogIn>
      </StyledLoginContainer>
    );
  }
  return (
    <StyledLoginContainer>
      <br /><P></P>

      <StyledLogIn onClick={() => signIn()}>Log in</StyledLogIn>
    </StyledLoginContainer>
  );
}

const P = styled.p`
  color: #040404;
  text-align: left;
  text-shadow: 2px 2px 4px 0px #fff;
  font-family: Roboto Slab;
  font-size: 16px;
  margin-top: 0;
  padding: 0;
  font-style: oblique;
`;
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
