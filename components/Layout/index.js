import styled from "styled-components";
import NavBar from "../NavigationsBar";
import {useState} from "react";
import {useSession } from "next-auth/react";

const StyledLayout = styled.div`
  margin: 0;
  background-image: url(/images/background-HungryOar.webp);
  background-color: var(--primary-color-back);
  background-repeat: no-repeat;
  background-size: cover, contain;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ children }) {

  const { data: session } = useSession()
const isAdmin = session?.user.name==="HungryOar"

  return (
    <StyledLayout session={session} admin={isAdmin}>
      {children} 
      <NavBar admin={isAdmin} session={session}/>
    </StyledLayout>
  );
}
