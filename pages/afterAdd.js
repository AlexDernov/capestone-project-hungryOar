import {useSession } from "next-auth/react";
import Head from "next/head.js";
import LogInOutButton from "../components/LogInOutButton";
import styled from "styled-components";
import Link from "next/link";

export default function afterAddPage() {
    const { data: session } = useSession(); 
  return (
    <div>
      <Head>
        <title>Your location was added</title>
        <LogInOutButton session={session} />
      </Head>
<StyledDiv>
      <StyledP>
        The upload was successful! <br />
        Thank you for helping to improve our App! <br />
        The data will be checked by admin, after that the suggested will appear in the main list of locations.
      </StyledP>
      <StyledButtonsDiv>
      <button type="button"><StyledLink href="/">Homepage</StyledLink></button>
      <button type="button"><StyledLink href="/add">Add more locations</StyledLink></button>
      </StyledButtonsDiv>
      </StyledDiv>
    </div>
  );
}
const StyledDiv = styled.div`
display: flex;
flex-direction: column;
height: 90vh;
margin-top: 1px;
padding: 40px;
background-color: rgba(255, 255, 255, 0.6)`;

const StyledButtonsDiv =styled.div`
width: 300px;
margin: 5px;
display: flex;
justify-content: space-around`;


const StyledP =styled.p`
padding-top: 40px;
margin: 10px;
font-size: 16px
`;

const StyledLink = styled(Link)`
padding:0;
text-decoration: none;
color: black; 
font-size: 16px`;