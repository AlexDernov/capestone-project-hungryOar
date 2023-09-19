import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const isAdmin = session?.user.name === "HungryOar";

  return (
    <StyledNav name="NavBar">
      <NavLink href="/">
        {" "}
        <StyledSvg
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.125 10.25L15.375 5.125L25.625 10.25L35.875 5.125V30.75L25.625 35.875L15.375 30.75L5.125 35.875V10.25Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.375 5.125V30.75"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25.625 10.25V35.875"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </StyledSvg>
        <StyledH4>Map </StyledH4>
      </NavLink>
      <NavLink href="/favorites">
        {" "}
        <StyledSvg
          width="41"
          height="41"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="m12 21.35-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
            fill="white"
            stroke="white"
          />
        </StyledSvg>
        <StyledH4>Favorites </StyledH4>
      </NavLink> 
      <NavLinkList href="/locations">
        {" "}
        <StyledSvg
          width="41"
          height="41"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.6667 10.25H35.875"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.6667 20.5H35.875"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.6667 30.75H35.875"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.125 10.25H5.14137"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.125 20.5H5.14137"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.125 30.75H5.14137"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </StyledSvg>
        <StyledH4> List</StyledH4>
      </NavLinkList>
      <NavLinkHidden href="/add" session={session}>
        {" "}
        <StyledSvg
          width="41"
          height="41"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.45 1C18.3626 1 17.3198 1.43196 16.5509 2.20086C15.782 2.96976 15.35 4.01261 15.35 5.1V15.35H5.1C4.01261 15.35 2.96976 15.782 2.20086 16.5509C1.43196 17.3198 1 18.3626 1 19.45V23.55C1 25.805 2.845 27.65 5.1 27.65H15.35V37.9C15.35 40.155 17.195 42 19.45 42H23.55C24.6374 42 25.6802 41.568 26.4491 40.7991C27.218 40.0302 27.65 38.9874 27.65 37.9V27.65H37.9C38.9874 27.65 40.0302 27.218 40.7991 26.4491C41.568 25.6802 42 24.6374 42 23.55V19.45C42 18.3626 41.568 17.3198 40.7991 16.5509C40.0302 15.782 38.9874 15.35 37.9 15.35H27.65V5.1C27.65 4.01261 27.218 2.96976 26.4491 2.20086C25.6802 1.43196 24.6374 1 23.55 1H19.45Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </StyledSvg>
        <StyledH4>Add </StyledH4>
      </NavLinkHidden>
      <NavLinkHidden href="/messages" session={session}>
        {" "}
        <StyledSvg
          width="41"
          height="41"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.1667 6.83325H6.83341C4.94644 6.83325 3.41675 8.36295 3.41675 10.2499V30.7499C3.41675 32.6369 4.94644 34.1666 6.83341 34.1666H34.1667C36.0537 34.1666 37.5834 32.6369 37.5834 30.7499V10.2499C37.5834 8.36295 36.0537 6.83325 34.1667 6.83325Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37.5834 11.9583L22.2597 21.6958C21.7323 22.0262 21.1225 22.2014 20.5001 22.2014C19.8777 22.2014 19.2679 22.0262 18.7405 21.6958L3.41675 11.9583"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </StyledSvg>
        <StyledH4>{isAdmin ? "Messages" : "Contact"} </StyledH4>
      </NavLinkHidden>
     
    </StyledNav>
  );
}

const NavLink = styled(Link)`
 
  widht: 100%;
  text-decoration: none;
  color: var(--primary-color);
  text-shadow: 1px 1px 1px black;
  border-color: black;
  &: hover {
    font-size: 1.1em;
  }
`;
const NavLinkList = styled(Link)`
  margin-bottom: 38px;
  widht: 100%;
  text-decoration: none;
  color: var(--primary-color);
  text-shadow: 1px 1px 1px black;
  border-color: black;
  &: hover {
    font-size: 1.1em;
  }
`;
const StyledNav = styled.nav`
  background-color: var(--primary-color-back);
  width: 100%;
  height: 79px;
  margin: 0;
  padding-top: 5px;
  padding-right: 10px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
`;
const NavLinkHidden = styled(Link)`
  widht: 100%;
  text-decoration: none;
 
  color: var(--primary-color);
  text-shadow: 1px 1px 1px black;
  border-color: black;
  &: hover {
    font-size: 1.1em;
  }
`;
/* display:${({ session }) => (session ? "block" : "none")}; */
const StyledH4 = styled.p`
  font-size: 10px;
  text-shadow: 1px 1px 1px black;
  color: var(--primary-color);
  padding: 0;
  margin: 0;
  text-align: center;
  width: 41px;
  height: auto;
`;

const StyledSvg = styled.svg`
  &: hover {
    width: 45px;
    height: 45px;
  }
`;
/* display: ${({on})=> (on ? "block" : "none")}; */
